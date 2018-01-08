#!/usr/bin/python
#coding:utf-8
from fabric.api import run, env, local, put
from fabric import context_managers
import sys
import os
sys.path.append(os.path.join(os.getcwd(), 'build'))

def mock():
  run('ls')

def hello():
  print("Hello world!")

def hello2(name):
  if isinstance(name, str):
    print("Hello %s!" % name)


def prod(time):
  if isinstance(time, str):
    os.system('')
    os.system("rename 's/dist\/vendor\..+.js/dist\/vendor\.js/s' dist/vendor.*.js")

def testPro():
  os.system('yarn run build-pro')
  removeTestEnv()
  uploadTestProEnv()

def test():
  os.system('yarn run build')
  uploadTestEnv()

def removeTestEnv():
  run('rm -rf /*')

def uploadTestEnv():
  put('./dist/*')

def uploadTestProEnv():
  put('./static/*', '/')