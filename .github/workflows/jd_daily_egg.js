
name: jd_daily_egg 京东提鹅
 
on:
  workflow_dispatch:
  schedule:
     - cron: '0 */3 * * *'
  watch:
    types: started
jobs:
  build:
    runs-on: ubuntu-latest
    if: github.event.repository.owner.id == github.event.sender.id
    env:
        KS_TOKEN: ${{ secrets.KS_TOKEN }}
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Use Node.js 12.x
        uses: actions/setup-node@v1
        with:
          node-version: 12.x
      - name: npm install
        run: |
          npm install
      - name: 运行 【京东提鹅】
        if: env.KS_TOKEN
        run: |
          node jd_daily_egg.js
        env:
          PUSH_KEY: ${{ secrets.PUSH_KEY || github.event.client_payload.PUSH_KEY }}
          BARK_PUSH: ${{ secrets.BARK_PUSH || github.event.client_payload.BARK_PUSH }}
          BARK_SOUND: ${{ secrets.BARK_SOUND || github.event.client_payload.BARK_SOUND }}
          TG_BOT_TOKEN: ${{ secrets.TG_BOT_TOKEN || github.event.client_payload.TG_BOT_TOKEN }}
          TG_USER_ID: ${{ secrets.TG_USER_ID || github.event.client_payload.TG_USER_ID }}
          DD_BOT_TOKEN: ${{ secrets.DD_BOT_TOKEN || github.event.client_payload.DD_BOT_TOKEN }}
          DD_BOT_SECRET: ${{ secrets.DD_BOT_SECRET || github.event.client_payload.DD_BOT_SECRET }}
          IGOT_PUSH_KEY: ${{ secrets.IGOT_PUSH_KEY || github.event.client_payload.IGOT_PUSH_KEY }}
          JD_COOKIE: ${{ secrets.JD_COOKIE || github.event.client_payload.JD_COOKIE }}
          JD_USER_AGENT: ${{ secrets.JD_USER_AGENT || github.event.client_payload.JD_USER_AGENT }}
          JD_DEBUG: ${{ secrets.JD_DEBUG || github.event.client_payload.JD_DEBUG }}
