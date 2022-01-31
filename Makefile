install:
	npm ci
publish:
	npm publish --dry-ru
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8