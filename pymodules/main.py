#!./venv/bin/python

from utils.cli import wait_for_params
from recognize import recognize_face

wait_for_params(recognize_face)
