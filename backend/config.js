var config = {
    "host": process.env.KYC_HOST || "localhost",
    "port": process.env.KYC_PORT || 3000,
    "addressOwner" : "0xcfa92430100547155f0a38cd3abcd0dd0bc64fd3",
    "privateKeyOwner" : "691477dbdf4f88c89c593541e6dc36d151d763e4e2fe0b7a4076387f006d305d",
    "user1address" : "0xf9096e4126ed17852601dd00a8a0c9e0455b851f",
    "user1privateKey" : "9a21645934a3ce65d3d568bc512c5c6213f5e40f2fe834e43850e04204d14eef", 
    "user2address" : "0xd74a1c63bf005953aba54300dda7c7aef9763ecd",
    "user2privateKey" : "5a17788756391ce37e90f1a6ddd58376ef37f2e061c6ee965c9d08348e74e574"
}
module.exports = config;