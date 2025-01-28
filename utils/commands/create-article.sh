#!/bin/bash

directory=src/content/blog/$(date "+%Y%m%d")-XX
file=$directory/index.mdoc
mkdir -p $directory
touch $file
cat > $file <<EOL
---
title:
type: blog | slide | video
tags:
  - 
publicationDate: $(date "+%Y-%m-%d")
---

EOL