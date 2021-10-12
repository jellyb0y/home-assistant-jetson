from face_recognition import load_image_file, face_encodings
from .constants import FACES_DIR
from glob import glob

import re

face_name_regexp = re.compile(r'/([^/.]*)\.[^.]+$')

def get_know_faces():
    face_images = glob(f'{FACES_DIR}/*.jpg')
    know_faces = {}
    
    for face_file in face_images:
        face_name_match = face_name_regexp.search(face_file)
        if not face_name_match:
            continue

        face_name = face_name_match[1]
        image = load_image_file(face_file)
        face_encoding = face_encodings(image)[0]

        know_faces[face_name] = face_encoding

    return know_faces