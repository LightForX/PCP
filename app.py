from flask import Flask, render_template, request, jsonify
import requests
app = Flask(__name__, 
            static_folder='static',
            template_folder='templates')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/contact', methods=['POST'])
def contact():
    data = request.form
    print(data)
    content = {
        "embeds": [
            {
                "title": "📬 New Contact Form Submission",
                "color": 5814783,  # blue-ish
                "fields": [
                    {"name": "Name", "value": data.get("yourname", "N/A"), "inline": True},
                    {"name": "Email", "value": data.get("email", "N/A"), "inline": True},
                    {"name": "Phone", "value": data.get("phonenumber", "N/A"), "inline": True},
                    {"name": "Best Time to Call", "value": data.get("btc", "N/A"), "inline": True},
                    {"name": "Street Address", "value": data.get("street", "N/A"), "inline": False},
                    {"name": "City", "value": data.get("city", "N/A"), "inline": True},
                    {"name": "State", "value": data.get("state", "N/A"), "inline": True},
                    {"name": "ZIP Code", "value": data.get("zip", "N/A"), "inline": True},
                    {"name": "Message", "value": data.get("msg", "N/A"), "inline": False}
                ]
            }
        ]
    }

    requests.post('https://discord.com/api/webhooks/1312979010451669032/C4VGYrNcKN30cQhyriNjRy-j8A5yaadHuU1NHp6y-2sp0tisfaPyOE9GuoXmewM8wKv4',json=content)
    

    return jsonify({'message': 'Thank you for your message! We will get back to you soon.'})

if __name__ == '__main__':
    app.run(debug=True) 