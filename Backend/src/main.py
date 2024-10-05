from flask import Flask, request, jsonify
import json
from flask_cors import CORS


userList = []
eventList = []

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Hello, World!'})

## Manejo de Usuarios:
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        print(data['username'])
        for user in userList:
            if user['username'] == data['username'] and user['password'] == data['password']:
                return jsonify({'message': 'Login successful'}) 
        return jsonify({'message': 'Login failed'})
    except Exception as e:
        return jsonify({'message': 'Error getting data'})
    
# Manejo de Eventos:

# Obtener todos los eventos
@app.route('/get/events', methods=['GET'])
def getEvents():
    return jsonify(eventList)

# ver un evento en particular (por su id)
@app.route('/get/event/<id>', methods=['GET'])
def getEvent(id):
    print(id)
    print(eventList)
    for event in eventList:
        print(event)
        if int(event['id']) == int(id):
            return jsonify(event)
    return jsonify({'message': 'Event not found'})

# patch a event
@app.route('/patch/event/<id>', methods=['PATCH'])
def patchEvent(id):
    try:
        data = request.get_json()
        for event in eventList:
            if event['id'] == int(id):
                event['name'] = data['name']
                event['description'] = data['description']
                return jsonify({'message': 'Event updated'})
        return jsonify({'message': 'Event not found'})
    except Exception as e:
        print(e)
        return jsonify({'message': 'Error updating event'})

# delete a event
@app.route('/delete/event/<id>', methods=['DELETE'])
def deleteEvent(id):
    for event in eventList:
        if event['id'] == int(id):
            eventList.remove(event)
            return jsonify({'message': 'Event deleted'})
    return jsonify({'message': 'Event not found'})

# post a event
@app.route('/add/event', methods=['POST'])
def postEvent():
    try:
        name = request.form['name']
        description = request.form['description']
        photo = request.form['photo']
        date = request.form['date']
        place = request.form['place']

        data = {
            'name': name,
            'description': description,
            'photo': photo,
            'date': date,
            'place': place
        }

        # crear ID: 
        data['id'] = len(eventList) + 1
        eventList.append(data)
        return jsonify({'message': 'Event created'})
    except Exception as e:
        print(e)
        return jsonify({'message': 'Error creating event'})

if __name__ == '__main__':
    userList.append({'username': 'admin', 'password': 'secret'})

    evento = {
        'name': 'Evento 1',
        'description': 'Este es el evento 1',
        'photo': 'https://www.dondeir.com/wp-content/uploads/2018/09/fiesta-1.jpg',
        'date': '2024-10-05',
        'place': 'Parque Infantil 1'
    }

    # crear ID:
    evento['id'] = int(len(eventList) + 1)
    eventList.append(evento)



    app.run(debug=True, host='0.0.0.0', port=5000)