# コンテナ起動
up:
	docker compose up -d

# コンテナ停止
down:
	docker compose down

# コンテナイメージボリューム削除
destroy:
	docker compose down --rmi all --volumes --remove-orphans

# コンテナビルド
build:
	docker compose build --no-cache --force-rm

# コンテナシェルログイン(go)
sh-go:
	docker compose exec go bash

# コンテナシェルログイン(remix)
sh-remix:
	docker compose exec remix bash

# コンテナシェルログイン(mysql)
sh-mysql:
	docker compose exec mysql bash

# migrate
migrate:
	docker compose exec go go run migrate/migrate.go

# go mod tidy
tidy:
	docker compose exec go go mod tidy

# npm install
npm-i:
	docker compose exec remix npm install

# npm run dev
npm-d:
	docker compose exec remix npm run dev