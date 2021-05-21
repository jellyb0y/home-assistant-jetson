from face_recognition import load_image_file, face_encodings, face_locations, compare_faces, face_distance
from utils.get_faces import get_know_faces
from cv2 import resize, rectangle, imwrite, putText, FILLED, FONT_HERSHEY_DUPLEX

import numpy as np

know_faces = get_know_faces()
known_face_encodings = list(know_faces.values())
know_face_names = list(know_faces.keys())

def recognize_face(path_from, path_to):
    # temp
    # path_from = '/home/jellyb0y/projects/home-assistant-jetson/pymodules/faces/Andrey.jpg'
    # path_to = '/home/jellyb0y/projects/home-assistant-jetson/pymodules/faces/Test.jpg'

    frame = load_image_file(path_from)
    small_frame = resize(frame, (0, 0), fx=0.25, fy=0.25)[:, :, ::-1]

    locations = face_locations(small_frame)
    encodings = face_encodings(small_frame, locations)

    face_names = []

    for encoding in encodings:
        # See if the face is a match for the known face(s)
        matches = compare_faces(known_face_encodings, encoding)
        name = "Unknown"

        distances = face_distance(known_face_encodings, encoding)
        best_match_index = np.argmin(distances)
        if matches[best_match_index]:
            name = know_face_names[best_match_index]

        face_names.append(name)

    for (top, right, bottom, left), name in zip(locations, face_names):
        # Scale back up face locations since the frame we detected in was scaled to 1/4 size
        top *= 4
        right *= 4
        bottom *= 4
        left *= 4

        # Draw a box around the face
        rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

        # Draw a label with a name below the face
        rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), FILLED)
        font = FONT_HERSHEY_DUPLEX
        putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)

    imwrite(path_to, frame)
