#!/bin/bash

echo -n "title: "
read title
hyphenated_title="${title// /-}"
directory=src/content/blog/$(date "+%Y%m%d")-$hyphenated_title
file=$directory/index.mdoc
mkdir $directory
touch $file
cat >$file <<EOL
---
title: $title
tags:
publicationDate: $(date "+%Y-%m-%d")
---

EOL