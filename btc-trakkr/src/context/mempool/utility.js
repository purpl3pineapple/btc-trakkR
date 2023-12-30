export default class MempoolUtility {
  static convertMempoolBlockFormat = (block) => {
    const {
      id,
      bits,
      difficulty,
      height,
      merkle_root,
      nonce,
      previousblockhash,
      size,
      stale,
      timestamp,
      tx_count,
      version,
      weight,
      extras: {
        avgFee,
        avgFeeRate,
        avgTxSize,
        coinbaseAddress,
        coinbaseRaw,
        coinbaseSignature,
        expectedFees,
        expectedWeight,
        feePercentiles,
        feeRange,
        header,
        matchRate,
        medianFee,
        pool: { name: poolName },
        similarity,
        segwitTotalTxs,
        segwitTotalSize,
        segwitTotalWeight,
        totalFees,
        totalInputs,
        totalInputAmt,
        totalOutputs,
        totalOutputAmt,
        utxoSetChange,
        utxoSetSize,
        virtualSize,
      },
    } = block;

    return {
      id,
      bits,
      difficulty,
      height,
      merkle_root,
      nonce,
      previousblockhash,
      size: (size / 1000000).toFixed(1),
      stale: stale === null ? "-" : stale === false ? "false" : "true",
      timestamp: new Date(timestamp * 1000).toLocaleString("en-US"),
      tx_count,
      version,
      weight: (weight / 1000000).toFixed(2),
      extras: {
        avgFee,
        avgFeeRate,
        avgTxSize,
        coinbaseAddress,
        coinbaseRaw,
        coinbaseSignature,
        expectedFees,
        expectedWeight: (expectedWeight / 1000000).toFixed(2),
        feePercentiles:
          feePercentiles === null
            ? "-"
            : feePercentiles.map((fee) => fee.toFixed()),
        feeRange: MempoolUtility.findRange(feeRange),
        header,
        matchRate,
        medianFee: medianFee.toFixed(),
        pool: {
          name: poolName,
        },
        similarity: (similarity * 100).toFixed(2),
        segwitTotalTxs,
        segwitTotalSize: (segwitTotalSize / 1000000).toFixed(1),
        segwitTotalWeight: (segwitTotalWeight / 1000000).toFixed(2),
        totalFees: (totalFees / 100000000).toFixed(3),
        totalInputs,
        totalInputAmt: totalInputAmt === null ? "-" : totalInputAmt,
        totalOutputs,
        totalOutputAmt: (totalOutputAmt / 100000000).toFixed(3),
        utxoSetChange,
        utxoSetSize: utxoSetSize === null ? "-" : utxoSetSize,
        virtualSize,
      },
    };
  };

  static findRange = (values) => {

    let smallest = null;
    let largest = null;

    values.forEach(value => {

        if(smallest === null){
            smallest = value;
        } else {
            if (value < smallest) smallest = value;
        }

        if(largest === null){
            largest = value;
        } else {
            if(value > largest) largest = value;
        }
    });

    return `${smallest.toFixed()} - ${largest.toFixed()}`;
  };
}
