export default function(value) {
    //999999.999999 bug
    let res;
    if(value<1){
        res = value.toString();
    }else{
        res = Math.ceil(value).toString();
    }
    let numN1 = 0;
    let numN2 = 1;
    let num1 = 0;
    let num2 = 0;
    let t1 = 1;
    //fix biginteger bigdecimal bug
    if (Math.abs(value) < 0.000001 && value != 0) {
        let temp = res.toString().split("e")
        if (temp[0].length > 4) {
            return `${parseFloat(temp[0]).toFixed(4)}E${temp[1]}`
        }
        return res.replace('e', 'E');
    }
    if (Math.abs(value) >= 1000000000000000000000) {
        let temp = res.toString().split("e")
        let number2 = Number(temp[1]);
        if (Math.floor(temp[0]) != Number(temp[0])) { //fix 9.999999 bug
            number2++
        }

        let rtn = 1 + 'E' + number2;
        return rtn.replace('e+', "E")
    }
    for (let k = 0; k < res.length; k++) {
        if (res[k] == ".")
            t1 = 0;
        if (t1)
            num1++;
        else
            num2++;
    }

    if (Math.abs(value) < 1 && res.length > 2) {
        for (let i = 2; i < res.length; i++) {
            if (res[i] == "0") {
                numN2++;
            } else if (res[i] == ".")
                continue;
            else
                break;
        }
        let v = parseFloat(value);
        
        //慎用Math.pow
        v = Number(`${v}e${numN2}`)
        // v = v * Math.pow(10, numN2);
        if (v.toString().length > 4) {
            v = v.toFixed(2)
        }
        return v.toString() + "E-" + numN2;
    } else if (num1 > 1) {
        if (res[0] == "-")
            numN1 = num1 - 2;
        else
            numN1 = num1 - 1;
        //999999.999999 bug
        let v = Math.ceil(value);
        v = v / Math.pow(10, numN1);
        if (num2 > 2)
            v = v.toFixed(2);
        return v.toString() + "E" + numN1;
    } else
        return parseFloat(value);

}