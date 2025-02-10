const admin = require('firebase-admin');

// Path to your service account key
const base64ServiceAccount =
  "ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiAgInByb2plY3RfaWQiOiAiZmVlYmVlLTg1NzhkIiwKICAicHJpdmF0ZV9rZXlfaWQiOiAiYThmYmZiM2JjZTExOWFjYzVmYmMyYzdkNzY2MTIxYjYxZmVkNzJhOCIsCiAgInByaXZhdGVfa2V5IjogIi0tLS0tQkVHSU4gUFJJVkFURSBLRVktLS0tLVxuTUlJRXZnSUJBREFOQmdrcWhraUc5dzBCQVFFRkFBU0NCS2d3Z2dTa0FnRUFBb0lCQVFDMUNVUWE0MG9uMUo5MFxuNllzV2pBU2FlUktzL3NPMWZEWkdsWUx5eFZDWFR3T1VpVVB5dEFGdVgxMUx4M2NGcGtYOU5BTXN4VzZGUFk3c1xudUV5Y0YyMjRGdDFxazJYWStqaFE1S09NanFabkhrUE53UTVFYnVDbEtHVU1kVXJNT0xlUDRsUTZ1SFdBbUVmU1xuYlRKRUNkTGZqRnA5QjQ0aFJhVXVzSHFvaHJSRllGWlNFZDdxRGVCMVl1Um1MelBsZlp3Q0srVEI1aHZLQVdGeFxuTnJUbXNNWkh3Sm9kUmlybkRiQjhMYkUvZDZBL0dDeXdBVyt0Z2hNL2toM1Q4Yy82ZEFUT3dLZFZqNDBuaitpaFxuelJ0YVNaSnJzaXdJOTAzOUhNdVF5dWJOR0h0aUN3dm5aTWJuQTgyaUFYdjVCM1k3NU1BQ1BCT3pXYXY3bFQ5SlxuQVVxdzhGODlBZ01CQUFFQ2dnRUFCTGsvSzZ4dWpPZUJXWjJXWVhvNXpJWUlOTGRaQiswN3hVKzFZUHhCQkJHdFxudUR4MHAycUc5d2hKK09ZMWR0SkYxVHQ4TWJqZEQyRHh6NzluVUZOVUs0OTlLNEM1RVpaRnplYUpWZXVLNy9uY1xuTHd3d2dSeWJnL092MzBsWU1FZnlrakNIbmhpZUNFTHc3TTZvbHhuaWhLNjIxYmhTdncrQUpkMjQ5WmkrTDJrdVxuMkc4cjlDNjVBTCt5TVBsa090aDYzY29STnYxSEdPWndRREQweDdMS2x0QUg4SElERWYwMXYyLzNsdFlnaTlYMFxuYXo1MzU2bi80aXZ5aFRadmVzSHJVSmRnVnhXUjJqbTRTNmdTRG1NMmNEWUQ2M1g2TGxQbk1EMUdUcEFQWFJOT1xuTkd1M3FYeXJCcmY3d3BJQy95Qk5jcUNtcUF1UlFmNXkxS0FBbGhkSXdRS0JnUURoVFJiNlJiVmhXQlMrSHJudlxubmJydHV2M1JIM1JWZjltNWtuYzJpSEdXd1k3ZHR3UDdORWU0QjhjZzBBUFdVdnRMR3dLaDFuQk13MGhkazhCVFxueHJNZnRPQjRhbjRmYXFQVHY0UmF2dHc1Z2NlVTloVVJnSm5hSHdnUHEvckpkWWRXYjdvbEtUZnFQNXJSUlhWaVxuTm9BcGYwOVBtaTVZM08vYWRKeXZnVks2aVFLQmdRRE50Q0tvUWJ5Zmg4cmRhNy93dFQxNzc1eHBHKzdxeXF4c1xuZmRzeG5xOXNYV0dIb1l6UUwwbkFxcU14R2R5dEx4dFlrZDVMa3gzUjFtLzQ5MHJVOHl0NTFZRnR1Zm83eEN3VVxuRkR0U1dwQkJXS0hRQ29QNVh5ZitURVBPZUgyRTEzU0w0OFJlZmZpNVFqWmpxRG9kYnBlenR3SWh0Z2QvekZuUlxuVzAzMy9hSUNGUUtCZ1FDQys0TnhTeGVSR1ZrdDBzVThkbEhYcGcrc0JZSm50cVdJeW9yK0xFTUZaMUE4dkFyWFxuZjJSMnJDYnJmNlBMZFlEZEFEMytncUhWTHU4aVlDUy9UOVNSaVdHN0FBYUZFMFZkZElscERHOFNDODVSWHVPT1xud2xvdndqeTRoNzZNWXdTa2p0NEVmcnNnTjR3MVFCRm5ZTklQemhENDhXVWlpb2Z6VkRwSG1vTFRLUUtCZ1FDb1xuWVlIVkZTcGZzL285VVl3bWIxVks5QkttZjNVTXdLWnZrSDR5bWVDaTViV0dIcGx6ZUtINGtqVlBaZ29id1dtelxuRUlSVWZMSjJLQUEwWGNqbGs3L00xUlpEU1c4cUtTU2pzd1AwSDZuaHM3bVE0R3F6WUU4T2ZFTXM2YmhsV3pCTlxucWozOTAwUWI4YlV2MG03djFLMWRNTHNQK1Q4ZVA1cHVJejBwZUhaN0dRS0JnRkpiUlhlY3U5MFBJWUNaaVduRFxuNnJYdW1iRUc5WnFpR2xzeUQwbDZVSVpvV21sWTU2cE9yS1p3N2NmVHpvMDV1M1RsYjBTZEl0d1FxMWs4YzVrN1xuMUxjcXhPK3RhSURzVVRVbk1kd0lqYkJPeFB2L2ZOYktLYWNRb2RIQlZ6U2J1RnlxWlp1My9BaFAzSTBLWVg4blxuT2FMSWRWL25QUTFGaDVhSHU2eXZuUDNYXG4tLS0tLUVORCBQUklWQVRFIEtFWS0tLS0tXG4iLAogICJjbGllbnRfZW1haWwiOiAiZmlyZWJhc2UtYWRtaW5zZGstMmk4YjRAZmVlYmVlLTg1NzhkLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwKICAiY2xpZW50X2lkIjogIjExODE4NjgzOTE3MDc2MDcyNzMzMCIsCiAgImF1dGhfdXJpIjogImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoIiwKICAidG9rZW5fdXJpIjogImh0dHBzOi8vb2F1dGgyLmdvb2dsZWFwaXMuY29tL3Rva2VuIiwKICAiYXV0aF9wcm92aWRlcl94NTA5X2NlcnRfdXJsIjogImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL29hdXRoMi92MS9jZXJ0cyIsCiAgImNsaWVudF94NTA5X2NlcnRfdXJsIjogImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3JvYm90L3YxL21ldGFkYXRhL3g1MDkvZmlyZWJhc2UtYWRtaW5zZGstMmk4YjQlNDBmZWViZWUtODU3OGQuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLAogICJ1bml2ZXJzZV9kb21haW4iOiAiZ29vZ2xlYXBpcy5jb20iCn0=="
const serviceAccount = JSON.parse(
  Buffer.from(base64ServiceAccount, "base64").toString("utf-8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://feebee-8578d.firebaseio.com", // Replace with your Firebase database URL
});
module.exports = admin;
