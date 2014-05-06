#!/bin/bash
DIST_DIR = ./build

#JS_LIB = lib/*.js
JS_SRC = ${JS_LIB} src/*.js

JS_FILE_BASE = htmlTT
JS_FILE = ${JS_FILE_BASE}.dev.js
JS_FILE_MIN = ${JS_FILE_BASE}.js

JS_DIST_FILE = ${DIST_DIR}/${JS_FILE}
JS_DIST_FILE_MIN = ${DIST_DIR}/${JS_FILE_MIN}

#CSS_LIB = lib/*.css
CSS_SRC = ${CSS_LIB} src/*.css
CSS_FILE = htmlTT.css
CSS_DIST_FILE = ${DIST_DIR}/${CSS_FILE}


#TEST_DIR = ./test

#add more test files
#TEST_FILES = ${TEST_DIR}/test-main.js

#target: all - clean, build/minify and lint
all: clean min lint

#target: dist - build
dist: ${JS_SRC}
	@cat ${JS_SRC} > ${JS_DIST_FILE}
	@cat ${CSS_SRC} > ${CSS_DIST_FILE};
	@echo 'target:' $@', building from:' ${JS_SRC}

#target: min - minify built file
min: dist
	@uglifyjs ${JS_DIST_FILE} > ${JS_DIST_FILE_MIN}
	@echo 'target:' $@', using uglifyjs'

#target: lint - run eslint tests
lint: dist
	@eslint --config .eslintrc ${JS_DIST_FILE}
	@echo 'target:' $@', using eslint'

##target: dist - build from src
#test: dist
#	@node ${TEST_FILES}
#	@echo 'target:' $@', using node and buster.js'

#target: clean - remove built files
clean:
		@rm -f ${DIST_DIR}/*.js
		@rm -f ${DIST_DIR}/*.css
		@echo 'target:' $@

#target: help - show available targets
help:
	@echo 'Available targets:'
	@egrep "^#target:" [Mm]akefile
