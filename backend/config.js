var config = {
    "host": process.env.KYC_HOST || "localhost",
    "port": process.env.KYC_PORT || 3000,
    "addressOwner" : "0x6a46ec4f59bc0825efd8369ba52ee448ffb8817d",
    "privateKeyOwner" : "09ebd8e9e6028f0e876798f19ab172985cb0d85d8b660312017abd73c614217c",
    "user1address" : "0x34795f52bc9774d2a506afb70a77a15061162673",
    "user1privateKey" : "042434284566c4f1a9f3a7c84af6120160fd071260e23f946ce52693a76d09dd", 
    "user2address" : "0xd3a797011ea10db8a8c0d0727805d1d465639776",
    "user2privateKey" : "2d8d0780cac35bd79bffed9d9ab0c66b527b20c4849c20a08f2b68f690a867a7"
}
module.exports = config;