<?php
function buildSourceString($data, $prefix = '')
{
	uksort($data, function($a, $b) {
        printf("firstItem: %s | secondItem: %s\n", json_encode($a), json_encode($b));

		$a_len = strlen($a);
		$b_len = strlen($b);

		$result = strncasecmp($a, $b, min($a_len, $b_len));

		if ($result === 0) {
			$result = $b_len - $a_len;
		}

		return $result;
	});

	$processed = [];

	foreach ($data as $key => $value) {
		if ($key === 'x_signature') continue;

		if (is_array($value)) {
			$processed[] = buildSourceString($value, $key);
		} else {
			$processed[] = $prefix . $key . $value;
		}
	}

	return implode('|', $processed);
}

$data = [
    "id" => "wvwhajzl",
    "collection_id" => "r0rakxbm",
    "paid" => "true",
    "state" => "paid",
    "amount" => "1000",
    "paid_amount" => "1000",
    "due_at" => "2021-5-1",
    "email" => "aiman2301@gmail.com",
    "mobile" => " ",
    "name" => "AIMAN DANIEL",
    "url" => "https: //www.billplz-sandbox.com/bills/wvwhajzl",
    "paid_at" => "2021-05-01 15:57:18 +0800",
    "x_signature" => "4a485572f88707ec700246e1870c8a99499da83be36f74ca63ebe1fbb4739ac0",
];

$ss = buildSourceString($data);

$key = "S-PKpEy-WsN-MWSb_nNronFA";

$x = "4a485572f88707ec700246e1870c8a99499da83be36f74ca63ebe1fbb4739ac0";

$sig = hash_hmac('sha256', $ss, $key);

var_dump($data, $ss, $sig, $x);