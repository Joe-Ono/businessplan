window.onload = () => {
    new Swiper('.swiper-container', {
        loop: true,
        autoHeight: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: true
        },
        speed: 500,
        effect: 'fade',
    });

    smoothScroll();
}
const smoothScroll = () => {
    const smooth = 10;
    const divisor = 8;
    const range = (divisor / 2) + 1;
    const links = document.querySelectorAll('a[href^="#"]');

    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function (e) {

            e.preventDefault();
            let moveY;
            let currentY = window.pageYOffset;
            const href = e.target.getAttribute('href');
            const target = document.querySelector(href);
            const position = target.getBoundingClientRect();
            const targetY = position.top + currentY;

            // スクロール終了まで繰り返される処理
            (scroll = () => {
                moveY = currentY + Math.round((targetY - currentY) / divisor);
                window.scrollTo(0, moveY);
                currentY = moveY;

                if (document.body.clientHeight - window.innerHeight < moveY) {
                    //最下部にスクロールしても対象まで届かない場合は下限までスクロールして強制終了。
                    window.scrollTo(0, document.body.clientHeight);
                    return;
                }
                if (moveY >= targetY + range || moveY <= targetY - range) {
                    //rangeの範囲内へ近づくまで繰り返す。
                    window.setTimeout(scroll, smooth);
                } else {
                    //rangeの範囲内に来れば正確な値へ移動して終了。
                    window.scrollTo(0, targetY);
                }
            })();
        });
    }
}
// 1日あたりの入店客数と客単価を入力してもらって、売上を計算。減価率を仮に35％とした時の売り上げ総利益を算出
function fncGROSSPROFIT() {
    var salesayear,a,b;
    a = parseFloat(document.salesayear.salesayearNoc.value) || 0;
    b = parseFloat(document.salesayear.salesayearCup.value) || 0;
    salesayear = a * b * 26 * 12;
    document.salesayear.salesayearAns.value = salesayear;
    var productcost,salesayear;
    productcost = document.salesayear.salesayearAns.value * 0.35;
    document.salesayear.productcostAns.value = Math.round(productcost);
    var grossprofit,salesayear,productcost;
    grossprofit = salesayear - productcost;
    document.salesayear.grossprofitAns.value = grossprofit;
    document.salesayear.grossprofitAns.value = document.salesayear.salesayearAns.value - document.salesayear.productcostAns.value;
    
    document.profit.grossprofitAns.value = document.profit.salesayearAns.value - document.profit.productcostAns.value;
    document.profit.salesayearAns.value = salesayear.toLocaleString();
    document.profit.productcostAns.value = productcost.toLocaleString();
    document.profit.grossprofitAns.value = grossprofit.toLocaleString();    
}
// 5年分の売上と売上総利益を計算
function fncSALESAYEAR() {
    // 各年度の列をループで処理
    for (var i = 0; i <= 5; i++) {
        var x = parseFloat(document.getElementsByName("salesayearNoc_" + i)[0].value) || 0;
        var y = parseFloat(document.getElementsByName("salesayearCup_" + i)[0].value) || 0;
        var a = x * y * 26 * 12;
        document.getElementsByName("salesayearAns_" + i)[0].value = a.toLocaleString();
    }
}

function fncGROSSPROFIT5() {
    for (var i = 0; i <= 5; i++) {
        var x = parseFloat(document.getElementsByName("salesayearTarget_" + i)[0].value) || 0;
        var y = parseFloat(document.getElementsByName("productcostRate_" + i)[0].value) || 0;
        var productCOST = x * y * 0.01;
        var grossPROFIT = x - productCOST;
        var elementsproductscost = document.getElementsByName("productcostAns_" + i);
        document.getElementsByName("salesAyear_" + i)[0].value = x.toLocaleString(); 
        for (var j = 0; j < elementsproductscost.length; j++){
            setTimeout((function(element, value) {
                return function() {
                    element.value = value;
                };
            })(elementsproductscost[j], productCOST), 0); 
        }            
        var elementsgrossprofit = document.getElementsByName("grossprofitAns_" + i);
        for (var k = 0; k < elementsgrossprofit.length; k++){
            setTimeout((function(element, value) {
                return function() {
                    element.value = value;
                };
            })(elementsgrossprofit[k], grossPROFIT), 0);
        }
    }
    return grossPROFIT;
}
             
// 販管費の各項目を入力してもらい開業後5年間の合計をそれぞれ計算する関数。
function fncGEX() {
    // 各年度の列をループで処理
    for (var i = 0; i <= 6; i++) {
        var gexTotal = 0;

        // gex1, gex2, gex3 …gex26の値を取得し合計を計算
        for (var j = 1; j <= 26; j++) {
            var gex = parseFloat(document.getElementsByName("gex" + j + "_" + i)[0].value);
            if(!isNaN(gex)){
                gexTotal += gex;
            }
        }
        // 販促費合計のセルに結果を表示
        document.getElementsByName("gextotal_" + i)[0].value = gexTotal.toLocaleString();
        document.getElementsByName("gex_" + i)[0].value = gexTotal;
    }
    return {
        gex,
        gexTotal,
    };
}

// 減価償却の計算をするための定額法、定率法の償却率、保証率の表をリストにして保存
var gaku = [
    ['2', '0.500'],
    ['3', '0.334'],
    ['4', '0.250'],
    ['5', '0.200'],
    ['6', '0.167'],
    ['7', '0.143'],
    ['8', '0.125'],
    ['9', '0.112'],
    ['10', '0.100'],
    ['11', '0.091'],
    ['12', '0.084'],
    ['13', '0.077'],
    ['14', '0.072'],
    ['15', '0.067'],
    ['16', '0.063'],
    ['17', '0.059'],
    ['18', '0.056'],
    ['19', '0.053'],
    ['20', '0.050'],
    ['21', '0.048'],
    ['22', '0.046'],
    ['23', '0.044'],
    ['24', '0.042'],
    ['25', '0.040'],
    ['26', '0.039'],
    ['27', '0.038'],
    ['28', '0.036'],
    ['29', '0.035'],
    ['30', '0.034'],
    ['31', '0.033'],
    ['32', '0.032'],
    ['33', '0.031'],
    ['34', '0.030'],
    ['35', '0.029'],
    ['36', '0.028'],
    ['37', '0.028'],
    ['38', '0.027'],
    ['39', '0.026'],
    ['40', '0.025'],
    ['41', '0.025'],
    ['42', '0.024'],
    ['43', '0.024'],
    ['44', '0.023'],
    ['45', '0.023'],
    ['46', '0.022'],
    ['47', '0.022'],
    ['48', '0.021'],
    ['49', '0.021'],
    ['50', '0.020'],
    ['51', '0.020'],
    ['52', '0.020'],
    ['53', '0.019'],
    ['54', '0.019'],
    ['55', '0.019'],
    ['56', '0.018'],
    ['57', '0.018'],
    ['58', '0.018'],
    ['59', '0.017'],
    ['60', '0.017'],
    ['61', '0.017'],
    ['62', '0.017'],
    ['63', '0.016'],
    ['64', '0.016'],
    ['65', '0.016'],
    ['66', '0.016'],
    ['67', '0.015'],
    ['68', '0.015'],
    ['69', '0.015'],
    ['70', '0.015'],
    ['71', '0.015'],
    ['72', '0.014'],
    ['73', '0.014'],
    ['74', '0.014'],
    ['75', '0.014'],
    ['76', '0.014'],
    ['77', '0.013'],
    ['78', '0.013'],
    ['79', '0.013'],
    ['80', '0.013'],
    ['81', '0.013'],
    ['82', '0.013'],
    ['83', '0.013'],
    ['84', '0.012'],
    ['85', '0.012'],
    ['86', '0.012'],
    ['87', '0.012'],
    ['88', '0.012'],
    ['89', '0.012'],
    ['90', '0.012'],
    ['91', '0.011'],
    ['92', '0.011'],
    ['93', '0.011'],
    ['94', '0.011'],
    ['95', '0.011'],
    ['96', '0.011'],
    ['97', '0.011'],
    ['98', '0.011'],
    ['99', '0.011'],
    ['100', '0.010']
]

// 入力してもらった個々の資産の情報から、初年度から5年後までの償却額と残価を算出して表に記入。
function fncDEPRECIATION() {
    var depreciationTotal = 0;
    var residualvalueTotal = 0;
    var depreciationLists = [];
    var residualvalueLists = [];
  
    for (var j = 1; j <= 12; j++) {
        var yearlyDepreciationList = [];
        var yearlyResidualvalueList = [];
  
        for (var i = 0; i <= 6; i++) {
            var x = parseFloat(document.getElementsByName("residualvalue" + j)[0].value) || 0;
            var y = parseFloat(document.getElementsByName("period" + j)[0].value) || 0;
            var rate = gaku[y - 2] ? gaku[y - 2][1] : 0;
            var yearlyDepreciation = Math.round(x * rate);
            var yearlyResidualvalue = Math.round(x - yearlyDepreciation * i);
  
            if (i < (y - 1)) {
                yearlyDepreciationList.push(yearlyDepreciation);
                yearlyResidualvalueList.push(yearlyResidualvalue);
            }   else if (i === (y - 1)) {
                yearlyResidualvalueList.push(yearlyResidualvalue);
                yearlyDepreciationList.push(yearlyDepreciation - 1);
            }   else if (i > (y - 1)) {
                    if (isNaN(parseFloat(document.getElementsByName("residualvalue" + j)[0].value)) && isNaN(parseFloat(document.getElementsByName("period" + j)[0].value))){
                        yearlyResidualvalueList.push(0);
                        yearlyDepreciationList.push(0); 
                    } else { 
                        yearlyResidualvalueList.push(1);
                        yearlyDepreciationList.push(0); 
                    }
            }   
            depreciationTotal += yearlyDepreciation;
            residualvalueTotal += yearlyResidualvalue;    
        }
        depreciationLists.push(yearlyDepreciationList);
        residualvalueLists.push(yearlyResidualvalueList);
  
        for (var i = 1; i <= 6; i++) {
            document.getElementsByName("depreciation" + j + "_" + i)[0].value = depreciationLists[j - 1][i - 1];
            document.getElementsByName("residualvalue" + j + "_" + i)[0].value = residualvalueLists[j - 1][i];
        }
    }  
  
    var depreciationSUM = [];
    var residualvalueSUM = [];
  
    for (var i = 1; i <= 6; i++) {
        var xTOTAL = 0;
        var yTOTAL = 0;
        var zTOTAL = 0;
  
        for (var j = 1; j <= 12; j++) {
            var x = parseFloat(document.getElementsByName("depreciation" + j + "_" + i)[0].value) || 0;
            var y = parseFloat(document.getElementsByName("residualvalue" + j + "_" + i)[0].value) || 0;
            var z = parseFloat(document.getElementsByName("residualvalue" + j)[0].value) || 0;
            xTOTAL += x;
            yTOTAL += y;
            zTOTAL += z;
        }
  
        depreciationSUM.push(xTOTAL) ;
        residualvalueSUM.push(yTOTAL);
  
        console.log(depreciationSUM);
        console.log(residualvalueSUM);

        document.getElementsByName("depreciationSum_" + i)[0].value = depreciationSUM[i - 1].toLocaleString();
        document.getElementsByName("residualvalueSum_" + i)[0].value = residualvalueSUM[i - 1].toLocaleString();
        document.getElementsByName("residualvalueSum")[0].value = zTOTAL.toLocaleString();
        document.getElementsByName("gex26_" + (i - 1))[0].value = depreciationSUM[i - 1];
        document.getElementsByName("DEPRECIATION_" + (i - 1))[0].value = depreciationSUM[i - 1];
    }
}
  
function calculateRepayment() {
    var a = parseFloat(document.getElementsByName("repaymentYears")[0].value);
    var b = parseFloat(document.getElementsByName("repaymentMonths")[0].value) || 0;
    var totalMonths = a * 12 + b;    // 返済期間を月数に変換
    var c = parseFloat(document.getElementsByName("holdMonths")[0].value) || 0;    // 元金据え置き期間を月数に変換  
    var r = parseFloat(document.getElementsByName("interestRate")[0].value) || 0;
    var monthlyInterest = r / 12 / 100;    // 金利を月利に変換
    var x = parseFloat(document.getElementsByName("loanAmount")[0].value);
    var monthlyPrincipalRepayment = x * 10000 / (totalMonths - c);    // 毎月の元金返済額
    var repaymentSchedule = [];    //毎月の返済額をリストにする
    var repaymentSchedulePrincipal = [];    //うち元金
    var repaymentScheduleInterest = [];     //うち利息分
    
    var totalRepayment = 0;
    var totalInterest = 0;
    
    for (var i = 0; i < c; i++) {
        var monthlyInterestRepayment = monthlyInterest * x * 10000;
        repaymentScheduleInterest.push(Math.round(monthlyInterestRepayment));
        repaymentSchedulePrincipal.push(0); 
        repaymentSchedule.push(Math.round(monthlyInterestRepayment));
        totalInterest += monthlyInterestRepayment;
    }

    for (var i = c; i < totalMonths; i++) {
        var borrowingBalance = x * 10000 - monthlyPrincipalRepayment * (i - c);
        var monthlyInterestRepayment = borrowingBalance * monthlyInterest; 
        repaymentScheduleInterest.push(Math.round(monthlyInterestRepayment));
        repaymentSchedulePrincipal.push(Math.round(monthlyPrincipalRepayment));
        repaymentSchedule.push(Math.round(monthlyPrincipalRepayment + monthlyInterestRepayment));
        totalInterest += monthlyInterestRepayment;
    }

    var startMonth, endMonth;
    for (var i = 0; i <= 5; i++) {
        var yearlyRepaymentAmount = 0;
        var yearlyInterestRepayment = 0;
        var yearlyPrincipalRepayment = 0;
        var startMonth = i*12;
        var endMonth = startMonth + 12;
            for (var j = startMonth; j < endMonth; j++) {
                if (j < repaymentSchedule.length) {
                    yearlyRepaymentAmount += repaymentSchedule[j];
                    yearlyInterestRepayment += repaymentScheduleInterest[j];
                    yearlyPrincipalRepayment += repaymentSchedulePrincipal[j];
                } else {
                    yearlyRepaymentAmount += 0;
                    yearlyInterestRepayment += 0;
                    yearlyPrincipalRepayment += 0;
                }
            }             
            document.getElementsByName("yearlyRepaymentAmount_" + i)[0].value = yearlyRepaymentAmount.toLocaleString();
            document.getElementsByName("interestpaid_" + i)[0].value = yearlyInterestRepayment;
            document.getElementsByName("PRINCIPAL_" + i)[0].value = yearlyRepaymentAmount.toLocaleString();
            document.getElementsByName("yearlyPrincipalRepayment_" + i)[0].value = yearlyPrincipalRepayment.toLocaleString();
            document.getElementsByName("PRINCIPAL_" + i)[0].value = yearlyPrincipalRepayment.toLocaleString();
            document.getElementsByName("yearlyInterestRepayment_" + i)[0].value = yearlyInterestRepayment.toLocaleString();
    }
    document.getElementsByName("totalRepayment")[0].value = (totalInterest + x * 10000).toLocaleString();
    document.getElementsByName("totalInterest")[0].value = totalInterest.toLocaleString();
}

function fncOPERATINGPROFIT() {
    for (var i = 0; i<= 5; i++) {
        var a = parseFloat(document.getElementsByName("grossprofitAns_" + i)[0].value);
        var b = parseFloat(document.getElementsByName("gex_" + i)[0].value);
        if(!isNaN(a) && !isNaN(b)){
            var operatingProfit = a - b;
        }
        document.getElementsByName("operatingProfit_" + i)[0].value = operatingProfit;
    }
    return operatingProfit;
}

function fncORDINARYPROFIT() {
    var operatingProfit = fncOPERATINGPROFIT().operatingProfit;
    var ordinaryProfit;
    for (var i = 0; i <= 5; i++) {
        var a = parseFloat(document.getElementsByName("operatingProfit_" + i)[0].value);
        var b = parseFloat(document.getElementsByName("non-operatingIncome_" + i)[0].value);
        var c = parseFloat(document.getElementsByName("non-operatingExpences_" + i)[0].value);
        var d = parseFloat(document.getElementsByName("interestpaid_" + i)[0].value);
        // 入力値が存在しない場合はデフォルト値として0を使用
        a = isNaN(a) ? 0 : a;
        b = isNaN(b) ? 0 : b;
        c = isNaN(c) ? 0 : c;
        d = isNaN(d) ? 0 : d;
        ordinaryProfit = a + b - c - d;        
        document.getElementsByName("ordinaryProfit_" + i)[0].value = ordinaryProfit;
    }    
    return ordinaryProfit;
}

function fncNETINCOMEBEFORETAX() {
    var ordinaryProfit = fncORDINARYPROFIT().ordinaryProfit;    
    for (var i = 0; i <= 5; i++) {
        var a = parseFloat(document.getElementsByName("ordinaryProfit_" + i)[0].value);
        var b = parseFloat(document.getElementsByName("extraordinaryProfit_" + i)[0].value);
        var c = parseFloat(document.getElementsByName("extraordinaryLoss_" + i)[0].value);
        var d = parseFloat(document.getElementsByName("DEPRECIATION_" + i)[0].value);
        var netincomeBeforetax;
        var corporateTax;
        var netincomeFortheperiod;
        var repayable;
        a = isNaN(a) ? 0 : a;
        b = isNaN(b) ? 0 : b;
        c = isNaN(c) ? 0 : c;
        d = isNaN(d) ? 0 : d;
            netincomeBeforetax = a + b - c;
            if (netincomeBeforetax < 0) {
                corporateTax = 0;
            } else {
                corporateTax = (a + b - c) * 0.3;
            }
            netincomeFortheperiod = netincomeBeforetax - corporateTax;
            repayable = netincomeBeforetax - corporateTax + d;
            document.getElementsByName("netincomeBeforetax_" + i)[0].value = netincomeBeforetax.toLocaleString();
            document.getElementsByName("corporateTax_" + i)[0].value = corporateTax.toLocaleString();
            document.getElementsByName("netincomeFortheperiod_" + i)[0].value = netincomeFortheperiod.toLocaleString();
            document.getElementsByName("REPAYABLE_" + i)[0].value = Math.round(repayable).toLocaleString();
    }
    return netincomeFortheperiod;
}
