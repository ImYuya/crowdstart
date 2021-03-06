# Crowdstart

クラウドファンディングにブロックチェーンを活用した Web アプリ

## 概要

例えば、「コワーキングスペースを作ろう！」というプロジェクトを作った場合に右図のような状況を防ぎかつ契約履行を自動的に行うユースケースを想定

<table style="border-style: none;"><tr>
  <td style="border-style: none;">
    <img width="450" alt="スクリーンショット 2019-08-17 7 59 28" src="https://user-images.githubusercontent.com/7827576/63202510-fb139b80-c0c4-11e9-9ba3-9933e3fec294.png">
  </td>
  <td style="border-style: none;">
    <img width="450" alt="スクリーンショット 2019-08-17 8 05 59" src="https://user-images.githubusercontent.com/7827576/63202675-de2b9800-c0c5-11e9-8451-609f697973fe.png">
  </td>
</table>

## UI

<table style="border-style: none;"><tr>
  <td style="border-style: none;">
    <img width="578" alt="スクリーンショット 2019-09-01 13 36 55" src="https://user-images.githubusercontent.com/7827576/64071831-a45db280-ccbd-11e9-8c93-467f2910cf7a.png">
  </td>
  <td style="border-style: none;">
   <img width="586" alt="スクリーンショット 2019-08-18 21 05 46" src="https://user-images.githubusercontent.com/7827576/63224589-5c408980-c201-11e9-80a9-715d3a23e6dd.png">
  </td>
  <td style="border-style: none;">
    <img width="562" alt="スクリーンショット 2019-08-18 20 54 59" src="https://user-images.githubusercontent.com/7827576/63224585-46cb5f80-c201-11e9-80af-5c4f4ea71c45.png">
  </td>
  <td style="border-style: none;">
   <img width="742" alt="スクリーンショット 2019-08-18 21 12 02" src="https://user-images.githubusercontent.com/7827576/63224597-7aa68500-c201-11e9-8839-e47afe5bba3b.png">
  </td>
</table>

## 使い方

- 本リポジトリのダウンロード,パッケージインストール

  ```
  git clone https://github.com/ImYuya/crowdstart.git
  cd crowdstart
  npm install
  ```

  `npm install`がうまくいかない場合、下記のようにインストール実行

  ```
  npm install --save fs-extra ganache-cli mocha solc@0.4.25 web3@1.0.0-beta.37
  npm install --save truffle-hdwallet-provider
  npm install --save next react react-dom
  npm install --save next-routes semantic-ui-css semantic-ui-react
  ```

- `ethereum`フォルダ内で`node compile.js`実行

  `Campaign.sol`ファイル内のコントラクト(Campaign,CampaignFactory)がコンパイルされ,`build`フォルダ内に json ファイルを出力

- `npm run test`によって、コントラクトの（自動）テストを行う

  下図のような結果になれば OK

   <img width="405" alt="スクリーンショット 2019-08-18 14 21 44" src="https://user-images.githubusercontent.com/7827576/63220483-9e4ada80-c1c3-11e9-9ecc-5a355e0514e7.png">

- `ethereum`フォルダ内で`private.js`を作成

  下記の mnemonic および provider の xxx の箇所を記入する

  ```
  module.exports = {
    mnemonic: "xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx",
    provider: "https://rinkeby.infura.io/v3/xxxxxxxxxxxxxxxxxxxxxxxxxx"
  };
  ```

  - MNEMONIC を取得

    Metamask でニーモニックを調べる。（注意！！：　ニーモニックは他人には絶対に教えないでください。）

    <table style="border-style: none;"><tr>
      <td style="border-style: none;">
       <img width="355" alt="スクリーンショット 2019-08-17 12 13 03" src="https://user-images.githubusercontent.com/7827576/63206078-08428180-c0e9-11e9-88f4-54f801a5689f.png">
      </td>
      <td style="border-style: none;">
       <img width="343" alt="スクリーンショット 2019-08-17 12 13 13" src="https://user-images.githubusercontent.com/7827576/63206085-12648000-c0e9-11e9-9626-295134cefaa7.png">
      </td>
      <td style="border-style: none;">
       <img width="345" alt="スクリーンショット 2019-08-17 12 13 22" src="https://user-images.githubusercontent.com/7827576/63206086-14c6da00-c0e9-11e9-8aa5-32c9c91fdd3a.png">
      </td>
      <td style="border-style: none;">
       <img width="351" alt="スクリーンショット 2019-08-17 12 13 36" src="https://user-images.githubusercontent.com/7827576/63206087-17293400-c0e9-11e9-82fd-f99b87b97114.png">
      </td>
    </table>

  - PROVIDER ID の取得

    [infura](https://infura.io/)にてアカウントを作成し、「Create new Project」ボタンで新規プロジェクトを作成.　<br>
    プロジェクトを開いて、PROJECT ID をコピー.　<br>
    今回は Rinkeby テストネットを使用しますが、Geth や Ganache で立ち上げたプライベートネット`http://localhost:8545`でも OK.

    <table style="border-style: none;"><tr>
    <td style="border-style: none;">
      <img width="500" alt="スクリーンショット 2019-08-17 13 46 48" src="https://user-images.githubusercontent.com/7827576/63206825-15666d00-c0f7-11e9-8207-001dd318623f.png">
    </td>
    <td style="border-style: none;">
      <img width="400" alt="スクリーンショット 2019-08-17 12 02 26" src="https://user-images.githubusercontent.com/7827576/63206824-14354000-c0f7-11e9-97da-0db04051a06e.png">
    </td>
    </table>

- `ethereum`フォルダ内で`node deploy.js`実行

  rinkeby テストネット内にコントラクトがデプロイされる <br>
  以下のようにコントラクトアドレスが生成されるの為、プロジェクトフォルダ直下に`ADDRESS`ファイルを作成し、記録しておく

  ```
  Attempting to deploy from account 0xcF01971DB0CAB2CBeE4A8C21BB7638aC1FA1c38c
  Contract deployed to 0x010B3F971ddC803424158fC1baF2d459A95EC153
  ```

- `ethereum/factory.js`ファイルの編集

  デプロイ時に記録したコントラクトアドレスを以下の"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"に代入

  ```
  const instance = new web3.eth.Contract(
   JSON.parse(CampaignFactory.interface),
   "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  );
  ```

- `npm run dev`による表示テスト

  http://localhost:3000　に接続される <br>
  また、上記の際、下図のように`package.json`ファイル内の scripts の設定を行っていること

  `"scripts": { "test": "mocha", "dev": "next dev" },`

## 要素技術

- Ethereum 環境: Solidity, Rinkeby テストネット
- フロントエンド: React, Next.js(ルーティング、サーバーサイドレンダリング), Web3.js
- サーバーサイド: Node.js

## アーキテクチャ

### Campaign コントラクトの変数・関数

変数:

| 変数名              | 型        | 説明                                                             |
| ------------------- | --------- | ---------------------------------------------------------------- |
| manager             | address   | このキャンペーンの管理者（発案者）のアドレス                     |
| minimumContribution | uint      | 貢献者または承認者(approver)と見なされるために必要な最小限の寄付 |
| approvers           | mapping   | お金を寄付したすべての人のアドレスリスト                         |
| requests            | Request[] | マネージャー(manager)が作成したリクエストのリスト                |
| campaignName        | string    | キャンペーンの名前                                               |

関数:

| 関数名          | 機能                                                                                          |
| --------------- | --------------------------------------------------------------------------------------------- |
| constructor     | minimumContribution と manager を設定するコンストラクタ                                       |
| contribute      | 誰かがキャンペーンにお金を寄付し、承認者(approver)になりたいときに呼び出される　              |
| createRequest   | 新しい支出リクエスト(spending request)を作成するためにマネージャ(manager)によって呼び出される |
| approveRequest  | 支出リクエスト(spending request)を承認するために各貢献者によって呼び出される                  |
| finalizeRequest | リクエストが十分に承認された後、マネージャーはこれを呼び出して、仕入先に送金する              |
| getCampaignName | この Campaign 名称のリスト返却　                                                              |

リクエスト(Request)の構造:

| 変数名        | 型      | 目的                                                        |
| ------------- | ------- | ----------------------------------------------------------- |
| description   | string  | リクエストが作成される理由の説明                            |
| value         | uint    | マネージャ(manager)が仕入先に送りたい金額                   |
| recipient     | address | 送金先（仕入先）のアドレス                                  |
| complete      | bool    | リクエストが既に処理されている（送金されている）場合は true |
| approvals     | mapping | 誰が投票したかを追跡                                        |
| approvalCount | uint    | 承認の数を追跡                                              |

### CampaignFactory コントラクトの変数・関数

変数:

| 変数名            | 型      | 説明                                   |
| ----------------- | ------- | -------------------------------------- |
| deployedCampaigns | address | デプロイされた全ての Campaign アドレス |

関数:

| 関数名               | 機能                                                             |
| -------------------- | ---------------------------------------------------------------- |
| createCampaign       | 新しい Campaign のインスタンス作成および作成されたアドレスの保存 |
| getDeployedCampaigns | デプロイされた全ての Campaign アドレスのリスト返却　             |
| getCampaignName      | デプロイされた全ての Campaign 名称のリスト返却　                 |

### ルーティング

| パス                           | 表示内容                                                     |
| ------------------------------ | ------------------------------------------------------------ |
| /                              | キャンペーン一覧                                             |
| /campaigns/new                 | キャンペーンを作成するためのフォーム　                       |
| /campaigns/0x8147              | アドレス 0x8147 のキャンペーンのキャンペーン詳細             |
| /campaigns/0x8147/requests     | アドレス 0x8147 のキャンペーンのリクエスト                   |
| /campaigns/0x8147/requests/new | アドレス 0x8147 でキャンペーンのリクエストを作成するフォーム |
