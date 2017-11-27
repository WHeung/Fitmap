#!/bin/bash
ftp -n<<!
open 120.24.154.176
user ftpuser 123456
binary
cd /
ls
lcd /code/codeGit/Fitmap/dist
prompt
# mdelete *.*
mput *.*
close
bye
!