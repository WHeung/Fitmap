#!/usr/bin/python
#coding:utf-8
from fabric.api import run, env, local, put
from fabric import context_managers
import sys
import os
sys.path.append(os.path.join(os.getcwd(), 'build'))

env.warn_only = True
env.hosts = ['120.24.154.176']
env.user = 'ftpuser'
env.password = '123456'

def mock():
  run('ls')

def hello():
  print("Hello world!")

def hello2(name):
  if isinstance(name, str):
    print("Hello %s!" % name)


def prod(time):
  if isinstance(time, str):
    os.system('yarn run build-pro-static -- --define process.env.dwfversion="\'%s\'"' % time)
    os.system("rename 's/dist\/vendor\..+.js/dist\/vendor\.js/s' dist/vendor.*.js")

def testPro():
  os.system('yarn run build-pro')
  removeTestEnv()
  uploadTestProEnv()

def test():
  os.system('yarn run build-test')
  uploadTestEnv()

def removeTestEnv():
  run('rm -rf /*')

def uploadTestEnv():
  put('./dist/*')

def uploadTestProEnv():
  put('./static/*', '/home/dev/h5/admin')