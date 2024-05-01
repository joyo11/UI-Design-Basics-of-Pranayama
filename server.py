from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)
points = 0
homepage_data = {
    "title": "Welcome to Basics of Pranayama!",
    "name": "Pranayama Homepage",
    "text": ["Pranayama is the ancient art of conscious breathing, \
             where the rhythm of inhalation and exhalation becomes your dance with the universe.",
             "Whether you're a seasoned yogi or a curious newcomer, Pranayama  \
             invites you to take a deep dive into the ocean of tranquility within yourself.",
             "Get ready to inhale bliss, exhale stress, and discover the incredible power of your breath!"],
    "image": "https://images.ctfassets.net/1tp0n7niw68j/26Veg94scTPnOiPsUiPML/737a87dc1cb3a0e20b717b41e0d97746/2._Bhastrika_pranayama__inhale___1_.jpg",
    "next": "/learn/1"
}

learn_data = {
    "1": { 
        "id": "1",
        "title": "What is Pranayama?",
        "name": "What is Pranayama Learn Page",
        "intro": "Pranayama: prana, which means life force or vital energy, and ayama, which means control or expansion. Together, pranayama refers to various breathing techniques or exercises practiced in yoga to control, regulate, and expand the breath and, by extension, the life force or vital energy within the body.",
        "image": "https://agility-ortho.com/wp-content/uploads/2022/10/yoga-164923092416x9-1.jpg",
        "prev": "/",
        "next": "/learn/2"
        },
        "2": { 
        "id": "2",
        "title": "Why Practice Pranayama",
        "name": "Why Practice Pranayama Learn Page",
        "steps": ["Stress Reduction and Relaxation: Pranayama techniques, such as deep breathing and alternate nostril breathing, can help activate the parasympathetic nervous system, inducing a state of relaxation and reducing the body's stress response.", 
                  "Improved Respiratory Health: Pranayama practices involve conscious control and manipulation of the breath, which can help improve respiratory function and lung capacity. By expanding lung capacity and increasing oxygen intake, pranayama techniques can enhance overall respiratory health, strengthen the respiratory muscles, and alleviate breathing difficulties.",
                  "Enhanced Mind-Body Connection and Mental Clarity: Pranayama practices encourage mindful awareness of the breath and its connection to the mind and body. By focusing attention on the breath and regulating its rhythm, practitioners can cultivate greater self-awareness, mental clarity, and emotional stability. Regular pranayama practice can sharpen concentration, improve cognitive function, and promote a sense of inner peace and harmony.",
                 ],
        "image": "https://i.mscwlns.co/mosaic-wellness/image/upload/f_auto,w_1000,c_limit/v1648647977/BW%20BLOG/Untitled-design--41-.jpg",
       
        "prev": "/learn/1",
        "next": "/learn/3"
        },
        "3": { 
        "id": "3",
        "title": "Overview of Techniques",
        "name": "Overview of Techniques Learning Page",
    
        
        "steps": ["Nadhi Sodhana: Nadi Shodhana, also known as alternate nostril breathing, is a pranayama technique in yoga involving the sequential inhalation and exhalation through alternate nostrils to balance the flow of energy in the body and calm the mind.", 
                  "Bhramari Pranayama: Bhramari Pranayama is a yogic breathing technique where one inhales deeply and exhales while producing a humming sound, often likened to the buzzing of a bee, to induce a calming effect on the mind and nervous system",
                  "Bhastrika Pranayama: Bhastrika Pranayama is a vigorous yogic breathing exercise involving rapid and forceful inhalations and exhalations to increase oxygen supply, energize the body, and clear the mind.",
                 ],
        "image": "https://kripalu.org/sites/default/files/pranayama_0.jpg",
        
        "prev": "/learn/2",
        "next": "/learn/4"
        },
    
    "4": { 
        "id": "4",
        "title": "Nadi Sodhana",
        "name": "Nadi Sodhana Learn Page",
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
                  "Repeat 10 times; this was one cycle"],
        "video": "https://www.youtube.com/embed/gWIt5OoQDv8?",
        "timestamps": [("37","55"), ("108","134")],
        "prev": "/learn/3",
        "next": "/practice/1"
        },
    "5": { 
        "id": "5",
        "name": "Bhramari Pranayama Learn Page",
        "title": "Bhramari Pranayama",
        "intro": "The name gives you a good idea of how the breath \
                  should be practised – it should sound like a humming bee!",
        "steps": ["Find a comfortable position", 
                  "Close your ears and eyes with your fingers and thumbs",
                  "Inhale deeply",
                  "Exhale slowly, making a buzzing sound like a bee",
                  "You can also make the sound 'om' if this is easier to imagine",
                  "Once you’ve finished the breath, you’ve completed a cycle",
                  "Continue for 5-10 minutes"],
        "video": "https://www.youtube.com/embed/GepGmj5sTjs?",
        "timestamps": [("43","72")],
        "prev": "/practice/1",
        "next": "/practice/2"
        },
    "6": { 
        "id": "6",
        "name": "Bhastrika Pranayama Learn Page",
        "title": "Bhastrika Pranayama",
        "intro": "Here is how you can do the ‘bellows breath’:",
        "steps": ["Sit in (lotus) position  with eyes closed and spine straight", 
                  "Inhale deeply through your nostrils",
                  "Exhale forcefully through your nostrils, using the diaphragm to 'pump'",
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
        "name": "Nadi Sodhana Practice Page",
        "text": "Practice Nadi Sodhana, inhaling and exhaling from your \
                          left and right nostrils when indicated by the countdown.",
        "placeholder": "https://cdn-icons-png.flaticon.com/512/5590/5590666.png",
        "media": "https://www.youtube.com/embed/YNMWS5cIAhY?si=tLWFPUKxSFY2CdeQ",
        "prev": "/learn/4",
        "next": "/learn/5"
        },
    "2": {
        "id": "2",
        "name": "Bhramari Pranayama Practice Page",
        "text": "Practice Bhramari Pranayama for \
                          20 seconds alongside the timer.",
        "placeholder": "https://cdn-icons-png.flaticon.com/512/5590/5590666.png",
        "media": "https://www.youtube.com/embed/aFiejt1dNUs?si=35lvjIlcht_xyPWI",
        "prev": "/learn/5",
        "next": "/learn/6"
    },
    "3": {
        "id": "3",
        "name": "Bhastrika Pranayama Practice Page",
        "text": "Practice Bhastrika Pranayama by trying to \
                          follow along with the rhythm you will hear.",
        "placeholder": "https://icones.pro/wp-content/uploads/2022/02/icone-du-son-et-du-haut-parleur-orange.png",
        "media": "https://www.youtube.com/embed/E67GYHE8ATY?si=oh6KANShRypSuNuI",
        "prev": "/learn/6",
        "next": "/question/1"
    }
}

quiz_data = {
    "1": {
        "id":"1",
        "name": "Question 1",
        "question": "The exercise where you breathe in through one nostril \
                     and exhale through the other is called ______________.",
        "answers": ["Bhastrika Pranayama", "Nadi Shodhana", "Viparita Karani", "Anulom Vilom Pranayama"],
        "correct": "b",
        "prev": "/practice/3",
        "next": "/question/2",
        "back_btn_text": "Back to Learn"
    },
    "2": {
        "id":"2",
        "name": "Question 2",
        "question": "The humming bee exercise is called ______________.",
        "answers": ["Tadasana", "Paschimottanasana", "Bhramari Pranayama", "Nadi Shodhana"],
        "correct": "c",
        "prev": "/question/1",
        "next": "/question/3",
        "back_btn_text": "Back to Question 1"
    },
    "3": {
        "id":"3",
        "name": "Question 3",
        "question": "The bellows breath exercise is called ______________.",
        "answers": ["Bhastrika Pranayama", "Paschimottanasana", "Ujjayi Pranayama", "Anulom Vilom Pranayama"],
        "correct": "a",
        "prev": "/question/2",
        "next": "/question/4",
        "back_btn_text": "Back to Question 2"
    }
}

interactive_data = {
    "4": {
        "id": "4",
        "name": "Interactive Question 1",
        "instructions": "Perform Nadi Sodhana for 20 seconds! \
                         Hold down left arrow to breathe from the left side and right arrow to breathe from the right side. \
                         Which arrow is blue indicates which side to breath from.",
        "prev": "/question/3",
        "next": "/question/5",
        "back_btn_text": "Back to Question 3",
        "media": "https://www.youtube.com/embed/tNTDBQQaueM?si=669Bvv5nsAnEy9C6"
    },
    "5": {
        "id": "5",
        "name": "Interactive Question 2",
        "instructions": "Perform Bhramari Pranayama for 30 seconds! Hold down space bar while humming. \
                         Breath out when the text is blue, and take a break while it is not.",
        "prev": "/question/4",
        "next": "/results",
        "back_btn_text": "Back to Question 4",
        "media": "https://www.youtube.com/embed/dsp5qPFlEIQ?si=TCkuc7S4DM0_I0TP"
    }
}

results_data = {
    "name": "Results Page",
    "retake_link": "/question/1"
}

timestamps = []

points_dict = {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0
}

# ROUTES
@app.route('/')
def home():
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
    
@app.route('/question/<item_id>')
def question(item_id):
    global interactive_data
    global quiz_data
    
    if item_id == "4":
        item = interactive_data["4"]
    
        return render_template('interactive1.html', item=item)
        
    elif item_id == "5":
        item = interactive_data["5"]
    
        return render_template('interactive2.html', item=item)
    
    item = quiz_data[item_id]

    return render_template('question.html', item=item)
    
@app.route('/results', methods=['GET', 'POST'])
def results():
    global points
    global results_data
    
    return render_template('results.html', points=points, item=results_data)

@app.route('/get_points')
def get_points():
    
    return jsonify({'points': points})

@app.route('/add_points', methods=['POST'])
def add_points():
    global points
    global points_dict
    data = request.json
    print('Received request to add points with data:', data)
    #points += data.get('points', 0)
    points_dict[data.get('id', 0)] = data.get('points', 0)
    points = sum(points_dict.values())
    print('Updated points:', points)
    return jsonify({'points': points})


if __name__ == '__main__':
    app.run(debug=True)
