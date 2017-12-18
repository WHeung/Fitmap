#!/bin/bash
ftp -n<<!
open 120.79.66.69
user ftpuser 123456
binary
cd /
ls
lcd /code/codeGit/Fitmap/static
prompt
# mdelete *.*
mput *.*
close
bye
!