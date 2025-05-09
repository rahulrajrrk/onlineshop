from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import json
import os
from datetime import datetime
import uuid

app = Flask(__name__)
CORS(app)

DATA_DIR = 'data'
IMAGE_DIR = 'static/images'
os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(IMAGE_DIR, exist_ok=True)

def read_data(file_name):
    path = os.path.join(DATA_DIR, file_name)
    if not os.path.exists(path):
        return []
    with open(path, 'r') as f:
        return json.load(f)

def write_data(file_name, data):
    path = os.path.join(DATA_DIR, file_name)
    with open(path, 'w') as f:
        json.dump(data, f, indent=2)

# =======================
# ✅ Base
# =======================
@app.route('/')
def home():
    return "API is running!"

# =======================
# 🛍 Products
# =======================
@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(read_data('products.txt'))

@app.route('/api/products', methods=['POST'])
def add_product():
    product = request.form.to_dict()
    image = request.files.get('image')
    if image:
        filename = image.filename
        image.save(os.path.join(IMAGE_DIR, filename))
        product['image'] = f'/static/images/{filename}'
    product['id'] = str(uuid.uuid4())
    products = read_data('products.txt')
    products.append(product)
    write_data('products.txt', products)
    return jsonify({'message': 'Product added'}), 201

@app.route('/static/images/<filename>')
def serve_image(filename):
    return send_from_directory(IMAGE_DIR, filename)

# =======================
# 🛒 Cart
# =======================
@app.route('/api/cart/<email>', methods=['GET'])
def get_cart(email):
    carts = read_data('cart.txt')
    user_cart = next((c for c in carts if c['userEmail'] == email), None)
    return jsonify(user_cart['items'] if user_cart else [])

@app.route('/api/cart/add', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    email = data['userEmail']
    item = data['item']

    carts = read_data('cart.txt')
    user_cart = next((c for c in carts if c['userEmail'] == email), None)

    if not user_cart:
        user_cart = {'userEmail': email, 'items': []}
        carts.append(user_cart)

    for existing in user_cart['items']:
        if existing['name'] == item['name']:
            existing['quantity'] += item['quantity']
            break
    else:
        user_cart['items'].append(item)

    write_data('cart.txt', carts)
    return jsonify({'message': 'Item added to cart'})

@app.route('/api/cart/update', methods=['PATCH'])
def update_cart_quantity():
    data = request.get_json()
    email = data['userEmail']
    name = data['name']
    quantity = data['quantity']

    carts = read_data('cart.txt')
    for user_cart in carts:
        if user_cart['userEmail'] == email:
            for item in user_cart['items']:
                if item['name'] == name:
                    item['quantity'] = quantity
                    write_data('cart.txt', carts)
                    return jsonify({'message': 'Quantity updated'})
    return jsonify({'error': 'Item not found'}), 404

@app.route('/api/cart/remove', methods=['DELETE'])
def remove_cart_item():
    data = request.get_json()
    email = data['userEmail']
    name = data['name']

    carts = read_data('cart.txt')
    for user_cart in carts:
        if user_cart['userEmail'] == email:
            user_cart['items'] = [i for i in user_cart['items'] if i['name'] != name]
            write_data('cart.txt', carts)
            return jsonify({'message': 'Item removed'})
    return jsonify({'error': 'Item not found'}), 404

# =======================
# 📦 Orders
# =======================
@app.route('/api/orders', methods=['POST'])
def place_order():
    data = request.get_json()
    order = {
        'id': str(uuid.uuid4()),
        'userEmail': data['userEmail'],
        'address': data['address'],
        'items': data['items'],
        'total': data['total'],
        'date': datetime.now().strftime('%Y-%m-%d'),
        'status': 'Pending'
    }

    orders = read_data('orders.txt')
    orders.append(order)
    write_data('orders.txt', orders)

    # clear cart
    carts = read_data('cart.txt')
    for c in carts:
        if c['userEmail'] == data['userEmail']:
            c['items'] = []
            break
    write_data('cart.txt', carts)

    return jsonify({'message': 'Order placed', 'orderId': order['id']}), 201

@app.route('/api/orders/<email>', methods=['GET'])
def get_user_orders(email):
    orders = read_data('orders.txt')
    return jsonify([o for o in orders if o['userEmail'] == email])

@app.route('/api/orders', methods=['GET'])
def get_all_orders():
    return jsonify(read_data('orders.txt'))

@app.route('/api/orders/status', methods=['PATCH'])
def update_order_status():
    data = request.get_json()
    order_id = data['id']
    new_status = data['status']

    orders = read_data('orders.txt')
    for order in orders:
        if order['id'] == order_id:
            order['status'] = new_status
            write_data('orders.txt', orders)
            return jsonify({'message': 'Order status updated'})
    return jsonify({'error': 'Order not found'}), 404

# =======================
# 👤 Users (Mock Auth)
# =======================
@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify(read_data('users.txt'))

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    users = read_data('users.txt')

    if any(u['email'] == data['email'] for u in users):
        return jsonify({'error': 'Email already exists'}), 409

    users.append(data)
    write_data('users.txt', users)
    return jsonify({'message': 'Registered successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    users = read_data('users.txt')

    for user in users:
        if user['email'] == data['email'] and user['password'] == data['password']:
            return jsonify({'message': 'Login successful', 'role': user.get('role', 'customer')})
    return jsonify({'error': 'Invalid credentials'}), 401

# =======================
# Run
# =======================
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
