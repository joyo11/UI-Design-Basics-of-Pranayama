from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

homepage_data = {
    "title": "Welcome to Basics of Pranayama!",
    "text": "Pranayama is the ancient art of conscious breathing, \
             where the rhythm of inhalation and exhalation becomes your dance with the universe. \
             Whether you're a seasoned yogi or a curious newcomer, Pranayama  \
             invites you to take a deep dive into the ocean of tranquility within yourself. \
             Get ready to inhale bliss, exhale stress, and discover the incredible power of your breath!",
    "image": "https://images.ctfassets.net/1tp0n7niw68j/26Veg94scTPnOiPsUiPML/737a87dc1cb3a0e20b717b41e0d97746/2._Bhastrika_pranayama__inhale___1_.jpg",
    "next": "/learn/1"
}

learn_data = {
    "1": { 
        "id": "1",
        "title": "Let’s start with Nadi Sodhana!",
        "intro": "Widely known as 'alternate nostril breathing', \
                  this pranayama helps to bring balance to the mind, body and soul.",
        "steps": ["Sit in a comfortable, cross-legged position", 
                  "Place your left hand on your left knee",
                  "Exhale completely",
                  "Use your right hand to close your right nostril",
                  "Inhale deeply with the left",
                  "Close the left nostril with your spare fingers",
                  "Open the right nostril, exhale completely",
                  "Inhale through the right nostril, then close",
                  "Open the left, exhale completely",
                  "This is one cycle; repeat 10 times"],
        "video": "https://www.youtube.com/embed/gWIt5OoQDv8?",
        "timestamps": [("37","55"), ("108","134")],
        "prev": "/",
        "next": "/practice/1"
        },
    "2": { 
        "id": "2",
        "title": "Next Technique - Bhramari Pranayama!",
        "intro": "The name gives you a good idea of how the breath \
                  should be practised – it should sound like a humming bee!",
        "steps": ["Find a comfortable position", 
                  "Close your ears and eyes with your fingers and thumbs",
                  "Inhale deeply",
                  "Then exhale slowly, making a buzzing sound like a bee",
                  "You can also make the sound 'om' if this is easier to imagine",
                  "Once you’ve finished the breath, you’ve completed a cycle",
                  "Continue for 5-10 minutes"],
        "video": "https://www.youtube.com/embed/GepGmj5sTjs?",
        "timestamps": [("43","72")],
        "prev": "/practice/1",
        "next": "/practice/2"
        },
    "3": { 
        "id": "3",
        "title": "Final Technique - Bhastrika Pranayama!",
        "intro": "Here is how you can do the ‘bellows breath’:",
        "steps": ["Sit in (lotus) position  with eyes closed and spine straight", 
                  "Inhale deeply through your nostrils",
                  "Then exhale forcefully through your nostrils, using the diaphragm to 'pump'",
                  "Inhale and exhale forcibly about 10 times (or whatever feels comfortable)",
                  "Then take a deep inhale",
                  "Hold the breath in for as long as you can",
                  "Slowly release the breath with a deep exhalation",
                  "After completing this cycle, you can rest with normal breathing, then continue for another three to five cycles"],
        "video": "https://www.youtube.com/embed/3zsFEsmDFOg?",
        "timestamps": [("10","53")],
        "prev": "/practice/2",
        "next": "/practice/3"
        }
}

practice_data = {
    "1": {
        "id": "1",
        "text": "Practice Nadi Sodhana, inhaling and exhaling from your \
                          left and right nostrils when indicated by the countdown.",
        "placeholder": "https://clipart-library.com/img/1867023.jpg",
        "media": "https://www.youtube.com/embed/0_CDMstFg7M?si=mAHfzKvDpyM6vpzF&",
        "prev": "/learn/1",
        "next": "/learn/2"
        },
    "2": {
        "id": "2",
        "text": "Practice Bhramari Pranayama for \
                          20 seconds alongside the timer.",
        "placeholder": "https://clipart-library.com/img/1867023.jpg",
        "media": "https://www.youtube.com/embed/0_CDMstFg7M?si=mAHfzKvDpyM6vpzF&",
        "prev": "/learn/2",
        "next": "/learn/3"
    },
    "3": {
        "id": "3",
        "text": "Practice Bhastrika Pranayama by trying to \
                          follow along with the rhythm you will hear.",
        "placeholder": "https://icones.pro/wp-content/uploads/2022/02/icone-du-son-et-du-haut-parleur-orange.png",
        "media": "https://www.youtube.com/embed/0_CDMstFg7M?si=mAHfzKvDpyM6vpzF&",
        "prev": "/learn/3",
        "next": "/quiz/1"
    }
}

timestamps = []
# ROUTES
@app.route('/')
def layout():
    global homepage_data
    return render_template('homepage.html', item=homepage_data)
    
@app.route('/add_time', methods=['GET', 'POST']) 
def add_time():
    global timestamps
    json_data = request.get_json()
    
    timestamps.append(json_data)
    return jsonify(timestamp = timestamps[-1])
    
@app.route('/learn/<item_id>')
def learn_item(item_id):
    global learn_data
    item = learn_data[item_id]
    
    return render_template('learn.html', item=item)
    
@app.route('/practice/<item_id>')
def practice_item(item_id):
    global practice_data
    item = practice_data[item_id]
    
    return render_template('practice.html', item=item)

if __name__ == '__main__':
    app.run(debug=True)
