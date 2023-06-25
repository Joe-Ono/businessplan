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
    a = JSON.parse(document.salesayear.salesayearNoc.value);
    b = JSON.parse(document.salesayear.salesayearCup.value);
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
        var x = JSON.parse(document.getElementsByName("salesayearNoc_" + i)[0].value);
        var y = JSON.parse(document.getElementsByName("salesayearCup_" + i)[0].value);
        var a = x * y * 26 * 12;
        document.getElementsByName("salesayearAns_" + i)[0].value = a.toLocaleString();
    }
}

function fncGROSSPROFIT5() {
    for (var i = 0; i <= 5; i++) {
        var x = JSON.parse(document.getElementsByName("salesayearTarget_" + i)[0].value);
        var y = JSON.parse(document.getElementsByName("productcostRate_" + i)[0].value);
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
// window.onload = fncGEX;

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
var ritu = [
    ['2', '1.000', '0.000', '0.00000'],
    ['3', '0.667', '1.000', '0.11089'],
    ['4', '0.500', '1.000', '0.12499'],
    ['5', '0.400', '0.500', '0.10800'],  
    ['6', '0.333', '0.334', '0.09911'],
    ['7', '0.286', '0.334', '0.08680'],
    ['8', '0.250', '0.334', '0.07909'],
    ['9', '0.222', '0.250', '0.07126'],
    ['10', '0.200', '0.250', '0.06552'],
    ['11', '0.182', '0.200', '0.05992'],
    ['12', '0.167', '0.200', '0.05566'],
    ['13', '0.154', '0.167', '0.05180'],
    ['14', '0.143', '0.167', '0.04854'],
    ['15', '0.133', '0.143', '0.04565'],
    ['16', '0.125', '0.143', '0.04294'],
    ['17', '0.118', '0.125', '0.04038'],
    ['18', '0.111', '0.112', '0.03884'],
    ['19', '0.105', '0.112', '0.03693'],
    ['20', '0.100', '0.112', '0.03486'],
    ['21', '0.095', '0.100', '0.03335'],
    ['22', '0.091', '0.100', '0.03182'],
    ['23', '0.087', '0.091', '0.03052'],
    ['24', '0.083', '0.084', '0.02969'],
    ['25', '0.080', '0.084', '0.02841'],
    ['26', '0.077', '0.084', '0.02716'],
    ['27', '0.074', '0.077', '0.02624'],
    ['28', '0.071', '0.072', '0.02568'],
    ['29', '0.069', '0.072', '0.02463'],
    ['30', '0.067', '0.072', '0.02366'],
    ['31', '0.065', '0.067', '0.02286'],
    ['32', '0.063', '0.067', '0.02216'],
    ['33', '0.061', '0.063', '0.02161'],
    ['34', '0.059', '0.063', '0.02097'],
    ['35', '0.057', '0.059', '0.02051'],
    ['36', '0.056', '0.059', '0.01974'],
    ['37', '0.054', '0.056', '0.01950'],
    ['38', '0.053', '0.056', '0.01882'],
    ['39', '0.051', '0.053', '0.01860'],
    ['40', '0.050', '0.053', '0.01791'],
    ['41', '0.049', '0.050', '0.01741'],
    ['42', '0.048', '0.050', '0.01694'],
    ['43', '0.047', '0.048', '0.01664'],
    ['44', '0.045', '0.046', '0.01664'],
    ['45', '0.044', '0.046', '0.01634'],
    ['46', '0.043', '0.044', '0.01601'],
    ['47', '0.043', '0.044', '0.01532'],
    ['48', '0.042', '0.044', '0.01499'],
    ['49', '0.041', '0.042', '0.01475'],
    ['50', '0.040', '0.042', '0.01440'],
    ['51', '0.039', '0.040', '0.01422'],
    ['52', '0.038', '0.039', '0.01422'],
    ['53', '0.038', '0.039', '0.01370'],
    ['54', '0.037', '0.038', '0.01370'],
    ['55', '0.036', '0.038', '0.01337'],
    ['56', '0.036', '0.038', '0.01288'],
    ['57', '0.035', '0.036', '0.01281'],
    ['58', '0.034', '0.035', '0.01281'],
    ['59', '0.034', '0.035', '0.01240'],
    ['60', '0.033', '0.034', '0.01240'],
    ['61', '0.033', '0.034', '0.01201'],
    ['62', '0.032', '0.033', '0.01201'],
    ['63', '0.032', '0.033', '0.01165'],
    ['64', '0.031', '0.032', '0.01165'],
    ['65', '0.031', '0.032', '0.01130'],
    ['66', '0.030', '0.031', '0.01130'],
    ['67', '0.030', '0.031', '0.01097'],
    ['68', '0.029', '0.030', '0.01097'],
    ['69', '0.029', '0.030', '0.01065'],
    ['70', '0.029', '0.030', '0.01034'],
    ['71', '0.028', '0.029', '0.01034'],
    ['72', '0.028', '0.029', '0.01006'],
    ['73', '0.027', '0.027', '0.01063'],
    ['74', '0.027', '0.027', '0.01035'],
    ['75', '0.027', '0.027', '0.01007'],
    ['76', '0.026', '0.027', '0.00980'],
    ['77', '0.026', '0.027', '0.00954'],
    ['78', '0.026', '0.027', '0.00929'],
    ['79', '0.025', '0.026', '0.00929'],
    ['80', '0.025', '0.026', '0.00907'],
    ['81', '0.025', '0.026', '0.00884'],
    ['82', '0.024', '0.024', '0.00929'],
    ['83', '0.024', '0.024', '0.00907'],
    ['84', '0.024', '0.024', '0.00885'],
    ['85', '0.024', '0.024', '0.00864'],
    ['86', '0.023', '0.023', '0.00885'],
    ['87', '0.023', '0.023', '0.00864'],
    ['88', '0.023', '0.023', '0.00844'],
    ['89', '0.022', '0.022', '0.00863'],
    ['90', '0.022', '0.022', '0.00844'],
    ['91', '0.022', '0.022', '0.00825'],
    ['92', '0.022', '0.022', '0.00807'],
    ['93', '0.022', '0.022', '0.00790'],
    ['94', '0.021', '0.021', '0.00807'],
    ['95', '0.021', '0.021', '0.00790'],
    ['96', '0.021', '0.021', '0.00773'],
    ['97', '0.021', '0.021', '0.00757'],
    ['98', '0.020', '0.020', '0.00773'],
    ['99', '0.020', '0.020', '0.00757'],
    ['100', '0.020', '0.020', '0.00742']
]

// 入力してもらった個々の資産の情報から、初年度から5年後までの償却額と残価を算出して表に記入。
// とりあえず６行目まで計算することにする。
function fncDEPRECIATION() {
    var x1,y1;
    x1 = document.depreciation.residualvalue1.value ? JSON.parse(document.depreciation.residualvalue1.value) : 0;
    y1 = document.depreciation.period1.value ? JSON.parse(document.depreciation.period1.value) : 0;
    var rate1 = gaku[y1 - 2] ? gaku[y1 - 2][1] : 0;    
    var depreciationlist1 = [];
    var residualvaluelist1 = [];
        for (var i = 1; i <= 7; i++) {
            var yearlyDepreciation = Math.round(x1 * rate1 );
            depreciationlist1.push(yearlyDepreciation);
            var yearlyResidualvalue = x1 - (yearlyDepreciation * (i - 1));
            residualvaluelist1.push(yearlyResidualvalue);
            document.depreciation.depreciation1_1.value = depreciationlist1[0];
            document.depreciation.depreciation1_2.value = depreciationlist1[1];
            document.depreciation.depreciation1_3.value = depreciationlist1[2];
            document.depreciation.depreciation1_4.value = depreciationlist1[3];
            document.depreciation.depreciation1_5.value = depreciationlist1[4];
            document.depreciation.depreciation1_6.value = depreciationlist1[5];
            document.depreciation.residualvalue1_1.value = residualvaluelist1[1];
            document.depreciation.residualvalue1_2.value = residualvaluelist1[2];
            document.depreciation.residualvalue1_3.value = residualvaluelist1[3];
            document.depreciation.residualvalue1_4.value = residualvaluelist1[4];
            document.depreciation.residualvalue1_5.value = residualvaluelist1[5];
            document.depreciation.residualvalue1_6.value = residualvaluelist1[6];
        }
    var x2,y2;
    x2 = document.depreciation.residualvalue2.value ? JSON.parse(document.depreciation.residualvalue2.value) : 0;
    y2 = document.depreciation.period2.value ? JSON.parse(document.depreciation.period2.value) : 0;
    var rate2 = gaku[y2 - 2] ? gaku[y2 - 2][1] : 0;    
    var depreciationlist2 = [];
    var residualvaluelist2 = [];
    for (var i = 1; i <= 7; i++) {
        var yearlyDepreciation = Math.round(x2 * rate2 );
        depreciationlist2.push(yearlyDepreciation);
        var yearlyResidualvalue = x2 - (yearlyDepreciation * (i - 1));
        residualvaluelist2.push(yearlyResidualvalue);
        document.depreciation.depreciation2_1.value = depreciationlist2[0];
        document.depreciation.depreciation2_2.value = depreciationlist2[1];
        document.depreciation.depreciation2_3.value = depreciationlist2[2];
        document.depreciation.depreciation2_4.value = depreciationlist2[3];
        document.depreciation.depreciation2_5.value = depreciationlist2[4];
        document.depreciation.depreciation2_6.value = depreciationlist2[5];
        document.depreciation.residualvalue2_1.value = residualvaluelist2[1];
        document.depreciation.residualvalue2_2.value = residualvaluelist2[2];
        document.depreciation.residualvalue2_3.value = residualvaluelist2[3];
        document.depreciation.residualvalue2_4.value = residualvaluelist2[4];
        document.depreciation.residualvalue2_5.value = residualvaluelist2[5];
        document.depreciation.residualvalue2_6.value = residualvaluelist2[6];
    }
    var x3,y3;
    x3 = document.depreciation.residualvalue3.value ? JSON.parse(document.depreciation.residualvalue3.value) : 0;
    y3 = document.depreciation.period3.value ? JSON.parse(document.depreciation.period3.value) : 0;
    var rate3 = gaku[y3 - 2] ? gaku[y3 - 2][1] : 0;    
    var depreciationlist3 = [];
    var residualvaluelist3 = [];
    for (var i = 1; i <= 7; i++) {
        var yearlyDepreciation = Math.round(x3 * rate3 );
        depreciationlist3.push(yearlyDepreciation);
        var yearlyResidualvalue = x3 - (yearlyDepreciation * (i - 1));
        residualvaluelist3.push(yearlyResidualvalue);
        document.depreciation.depreciation3_1.value = depreciationlist3[0];
        document.depreciation.depreciation3_2.value = depreciationlist3[1];
        document.depreciation.depreciation3_3.value = depreciationlist3[2];
        document.depreciation.depreciation3_4.value = depreciationlist3[3];
        document.depreciation.depreciation3_5.value = depreciationlist3[4];
        document.depreciation.depreciation3_6.value = depreciationlist3[5];
        document.depreciation.residualvalue3_1.value = residualvaluelist3[1];
        document.depreciation.residualvalue3_2.value = residualvaluelist3[2];
        document.depreciation.residualvalue3_3.value = residualvaluelist3[2];
        document.depreciation.residualvalue3_4.value = residualvaluelist3[4];
        document.depreciation.residualvalue3_5.value = residualvaluelist3[5];
        document.depreciation.residualvalue3_6.value = residualvaluelist3[6];
    }
    var x4,y4;
    x4 = document.depreciation.residualvalue4.value ? JSON.parse(document.depreciation.residualvalue4.value) : 0;
    y4 = document.depreciation.period4.value ? JSON.parse(document.depreciation.period4.value) : 0;
    var rate4 = gaku[y4 - 2] ? gaku[y4 - 2][1] : 0;    
    var depreciationlist4 = [];
    var residualvaluelist4 = [];
    for (var i = 1; i <= 7; i++) {
        var yearlyDepreciation = Math.round(x4 * rate4 );
        depreciationlist4.push(yearlyDepreciation);
        var yearlyResidualvalue = x4 - (yearlyDepreciation * (i - 1));
        residualvaluelist4.push(yearlyResidualvalue);
        document.depreciation.depreciation4_1.value = depreciationlist4[0];
        document.depreciation.depreciation4_2.value = depreciationlist4[1];
        document.depreciation.depreciation4_3.value = depreciationlist4[2];
        document.depreciation.depreciation4_4.value = depreciationlist4[3];
        document.depreciation.depreciation4_5.value = depreciationlist4[4];
        document.depreciation.depreciation4_6.value = depreciationlist4[5];
        document.depreciation.residualvalue4_1.value = residualvaluelist4[1];
        document.depreciation.residualvalue4_2.value = residualvaluelist4[2];
        document.depreciation.residualvalue4_3.value = residualvaluelist4[3];
        document.depreciation.residualvalue4_4.value = residualvaluelist4[4];
        document.depreciation.residualvalue4_5.value = residualvaluelist4[5];
        document.depreciation.residualvalue4_6.value = residualvaluelist4[6];
    }
    var x5,y5;
    x5 = document.depreciation.residualvalue5.value ? JSON.parse(document.depreciation.residualvalue5.value) : 0;
    y5 = document.depreciation.period5.value ? JSON.parse(document.depreciation.period5.value) : 0;
    var rate5 = gaku[y5 - 2] ? gaku[y5 - 2][1] : 0;    
    var depreciationlist5 = [];
    var residualvaluelist5 = [];
    for (var i = 1; i <= 7; i++) {
        var yearlyDepreciation = Math.round(x5 * rate5 );
        depreciationlist5.push(yearlyDepreciation);
        var yearlyResidualvalue = x5 - (yearlyDepreciation * (i - 1));
        residualvaluelist5.push(yearlyResidualvalue);
        document.depreciation.depreciation5_1.value = depreciationlist5[0];
        document.depreciation.depreciation5_2.value = depreciationlist5[1];
        document.depreciation.depreciation5_3.value = depreciationlist5[2];
        document.depreciation.depreciation5_4.value = depreciationlist5[3];
        document.depreciation.depreciation5_5.value = depreciationlist5[4];
        document.depreciation.depreciation5_6.value = depreciationlist5[5];
        document.depreciation.residualvalue5_1.value = residualvaluelist5[1];
        document.depreciation.residualvalue5_2.value = residualvaluelist5[2];
        document.depreciation.residualvalue5_3.value = residualvaluelist5[3];
        document.depreciation.residualvalue5_4.value = residualvaluelist5[4];
        document.depreciation.residualvalue5_5.value = residualvaluelist5[5];
        document.depreciation.residualvalue5_6.value = residualvaluelist5[6];
    }
    var x6,y6;
    x6 = document.depreciation.residualvalue6.value ? JSON.parse(document.depreciation.residualvalue6.value) : 0;
    y6 = document.depreciation.period6.value ? JSON.parse(document.depreciation.period6.value) : 0;
    var rate6 = gaku[y6 - 2] ? gaku[y6 - 2][1] : 0;    
    var depreciationlist6 = [];
    var residualvaluelist6 = [];
    for (var i = 1; i <= 7; i++) {
        var yearlyDepreciation = Math.round(x6 * rate6 );
        depreciationlist6.push(yearlyDepreciation);
        var yearlyResidualvalue = x6 - (yearlyDepreciation * (i - 1));
        residualvaluelist6.push(yearlyResidualvalue);
        document.depreciation.depreciation6_1.value = depreciationlist6[0];
        document.depreciation.depreciation6_2.value = depreciationlist6[1];
        document.depreciation.depreciation6_3.value = depreciationlist6[2];
        document.depreciation.depreciation6_4.value = depreciationlist6[3];
        document.depreciation.depreciation6_5.value = depreciationlist6[4];
        document.depreciation.depreciation6_6.value = depreciationlist6[5];
        document.depreciation.residualvalue6_1.value = residualvaluelist6[1];
        document.depreciation.residualvalue6_2.value = residualvaluelist6[2];
        document.depreciation.residualvalue6_3.value = residualvaluelist6[3];
        document.depreciation.residualvalue6_4.value = residualvaluelist6[4];
        document.depreciation.residualvalue6_5.value = residualvaluelist6[5];
        document.depreciation.residualvalue6_6.value = residualvaluelist6[6];
    }
    var x7,y7;
    x7 = document.depreciation.residualvalue7.value ? JSON.parse(document.depreciation.residualvalue7.value) : 0;
    y7 = document.depreciation.period7.value ? JSON.parse(document.depreciation.period7.value) : 0;
    var rate7 = gaku[y7 - 2] ? gaku[y7 - 2][1] : 0;    
    var depreciationlist7 = [];
    var residualvaluelist7 = [];
        for (var i = 1; i <= 7; i++) {
            var yearlyDepreciation = Math.round(x7 * rate7 );
            depreciationlist7.push(yearlyDepreciation);
            var yearlyResidualvalue = x7 - (yearlyDepreciation * (i - 1));
            residualvaluelist7.push(yearlyResidualvalue);
            document.depreciation.depreciation7_1.value = depreciationlist7[0];
            document.depreciation.depreciation7_2.value = depreciationlist7[1];
            document.depreciation.depreciation7_3.value = depreciationlist7[2];
            document.depreciation.depreciation7_4.value = depreciationlist7[3];
            document.depreciation.depreciation7_5.value = depreciationlist7[4];
            document.depreciation.depreciation7_6.value = depreciationlist7[5];
            document.depreciation.residualvalue7_1.value = residualvaluelist7[1];
            document.depreciation.residualvalue7_2.value = residualvaluelist7[2];
            document.depreciation.residualvalue7_3.value = residualvaluelist7[3];
            document.depreciation.residualvalue7_4.value = residualvaluelist7[4];
            document.depreciation.residualvalue7_5.value = residualvaluelist7[5];
            document.depreciation.residualvalue7_6.value = residualvaluelist7[6];
        }
    var x8,y8;
    x8 = document.depreciation.residualvalue8.value ? JSON.parse(document.depreciation.residualvalue8.value) : 0;
    y8 = document.depreciation.period8.value ? JSON.parse(document.depreciation.period8.value) : 0;
    var rate8 = gaku[y8 - 2] ? gaku[y8 - 2][1] : 0;    
    var depreciationlist8 = [];
    var residualvaluelist8 = [];
        for (var i = 1; i <= 7; i++) {
            var yearlyDepreciation = Math.round(x8 * rate8 );
            depreciationlist8.push(yearlyDepreciation);
            var yearlyResidualvalue = x8 - (yearlyDepreciation * (i - 1));
            residualvaluelist8.push(yearlyResidualvalue);
            document.depreciation.depreciation8_1.value = depreciationlist8[0];
            document.depreciation.depreciation8_2.value = depreciationlist8[1];
            document.depreciation.depreciation8_3.value = depreciationlist8[2];
            document.depreciation.depreciation8_4.value = depreciationlist8[3];
            document.depreciation.depreciation8_5.value = depreciationlist8[4];
            document.depreciation.depreciation8_6.value = depreciationlist8[5];
            document.depreciation.residualvalue8_1.value = residualvaluelist8[1];
            document.depreciation.residualvalue8_2.value = residualvaluelist8[2];
            document.depreciation.residualvalue8_3.value = residualvaluelist8[3];
            document.depreciation.residualvalue8_4.value = residualvaluelist8[4];
            document.depreciation.residualvalue8_5.value = residualvaluelist8[5];
            document.depreciation.residualvalue8_6.value = residualvaluelist8[6];
        }
    var x9,y9;
    x9 = document.depreciation.residualvalue9.value ? JSON.parse(document.depreciation.residualvalue9.value) : 0;
    y9 = document.depreciation.period9.value ? JSON.parse(document.depreciation.period9.value) : 0;
    var rate9 = gaku[y9 - 2] ? gaku[y9 - 2][1] : 0;    
    var depreciationlist9 = [];
    var residualvaluelist9 = [];
        for (var i = 1; i <= 7; i++) {
            var yearlyDepreciation = Math.round(x9 * rate9 );
            depreciationlist9.push(yearlyDepreciation);
            var yearlyResidualvalue = x9 - (yearlyDepreciation * (i - 1));
            residualvaluelist9.push(yearlyResidualvalue);
            document.depreciation.depreciation9_1.value = depreciationlist9[0];
            document.depreciation.depreciation9_2.value = depreciationlist9[1];
            document.depreciation.depreciation9_3.value = depreciationlist9[2];
            document.depreciation.depreciation9_4.value = depreciationlist9[3];
            document.depreciation.depreciation9_5.value = depreciationlist9[4];
            document.depreciation.depreciation9_6.value = depreciationlist9[5];
            document.depreciation.residualvalue9_1.value = residualvaluelist9[1];
            document.depreciation.residualvalue9_2.value = residualvaluelist9[2];
            document.depreciation.residualvalue9_3.value = residualvaluelist9[3];
            document.depreciation.residualvalue9_4.value = residualvaluelist9[4];
            document.depreciation.residualvalue9_5.value = residualvaluelist9[5];
            document.depreciation.residualvalue9_6.value = residualvaluelist9[6];
        }
    var x10,y10;
    x10 = document.depreciation.residualvalue10.value ? JSON.parse(document.depreciation.residualvalue10.value) : 0;
    y10 = document.depreciation.period10.value ? JSON.parse(document.depreciation.period10.value) : 0;
    var rate10 = gaku[y10 - 2] ? gaku[y10 - 2][1] : 0;    
    var depreciationlist10 = [];
    var residualvaluelist10 = [];
        for (var i = 1; i <= 7; i++) {
            var yearlyDepreciation = Math.round(x10 * rate10 );
            depreciationlist10.push(yearlyDepreciation);
            var yearlyResidualvalue = x10 - (yearlyDepreciation * (i - 1));
            residualvaluelist10.push(yearlyResidualvalue);
            document.depreciation.depreciation10_1.value = depreciationlist10[0];
            document.depreciation.depreciation10_2.value = depreciationlist10[1];
            document.depreciation.depreciation10_3.value = depreciationlist10[2];
            document.depreciation.depreciation10_4.value = depreciationlist10[3];
            document.depreciation.depreciation10_5.value = depreciationlist10[4];
            document.depreciation.depreciation10_6.value = depreciationlist10[5];
            document.depreciation.residualvalue10_1.value = residualvaluelist10[1];
            document.depreciation.residualvalue10_2.value = residualvaluelist10[2];
            document.depreciation.residualvalue10_3.value = residualvaluelist10[3];
            document.depreciation.residualvalue10_4.value = residualvaluelist10[4];
            document.depreciation.residualvalue10_5.value = residualvaluelist10[5];
            document.depreciation.residualvalue10_6.value = residualvaluelist10[6];
        }
    var x11,y11;
    x11 = document.depreciation.residualvalue11.value ? JSON.parse(document.depreciation.residualvalue11.value) : 0;
    y11 = document.depreciation.period11.value ? JSON.parse(document.depreciation.period11.value) : 0;
    var rate11 = gaku[y11 - 2] ? gaku[y11 - 2][1] : 0;    
    var depreciationlist11 = [];
    var residualvaluelist11 = [];
        for (var i = 1; i <= 7; i++) {
            var yearlyDepreciation = Math.round(x11 * rate11 );
            depreciationlist11.push(yearlyDepreciation);
            var yearlyResidualvalue = x11 - (yearlyDepreciation * (i - 1));
            residualvaluelist11.push(yearlyResidualvalue);
            document.depreciation.depreciation11_1.value = depreciationlist11[0];
            document.depreciation.depreciation11_2.value = depreciationlist11[1];
            document.depreciation.depreciation11_3.value = depreciationlist11[2];
            document.depreciation.depreciation11_4.value = depreciationlist11[3];
            document.depreciation.depreciation11_5.value = depreciationlist11[4];
            document.depreciation.depreciation11_6.value = depreciationlist11[5];
            document.depreciation.residualvalue11_1.value = residualvaluelist11[1];
            document.depreciation.residualvalue11_2.value = residualvaluelist11[2];
            document.depreciation.residualvalue11_3.value = residualvaluelist11[3];
            document.depreciation.residualvalue11_4.value = residualvaluelist11[4];
            document.depreciation.residualvalue11_5.value = residualvaluelist11[5];
            document.depreciation.residualvalue11_6.value = residualvaluelist11[6];
        }
    var x12,y12;
    x12 = document.depreciation.residualvalue12.value ? JSON.parse(document.depreciation.residualvalue12.value) : 0;
    y12 = document.depreciation.period12.value ? JSON.parse(document.depreciation.period12.value) : 0;
    var rate12 = gaku[y12 - 2] ? gaku[y12 - 2][1] : 0;    
    var depreciationlist12 = [];
    var residualvaluelist12 = [];
        for (var i = 1; i <= 7; i++) {
            var yearlyDepreciation = Math.round(x2 * rate12 );
            depreciationlist12.push(yearlyDepreciation);
            var yearlyResidualvalue = x12 - (yearlyDepreciation * (i - 1));
            residualvaluelist12.push(yearlyResidualvalue);
            document.depreciation.depreciation12_1.value = depreciationlist12[0];
            document.depreciation.depreciation12_2.value = depreciationlist12[1];
            document.depreciation.depreciation12_3.value = depreciationlist12[2];
            document.depreciation.depreciation12_4.value = depreciationlist12[3];
            document.depreciation.depreciation12_5.value = depreciationlist12[4];
            document.depreciation.depreciation12_6.value = depreciationlist12[5];
            document.depreciation.residualvalue12_1.value = residualvaluelist12[1];
            document.depreciation.residualvalue12_2.value = residualvaluelist12[2];
            document.depreciation.residualvalue12_3.value = residualvaluelist12[3];
            document.depreciation.residualvalue12_4.value = residualvaluelist12[4];
            document.depreciation.residualvalue12_5.value = residualvaluelist12[5];
            document.depreciation.residualvalue12_6.value = residualvaluelist12[6];
        }

    return {
        depreciationlist1,
        residualvaluelist1,
        depreciationlist2,
        residualvaluelist2,
        depreciationlist3,
        residualvaluelist3,
        depreciationlist4,
        residualvaluelist4,
        depreciationlist5,
        residualvaluelist5,
        depreciationlist6,
        residualvaluelist6,
        depreciationlist7,
        residualvaluelist7,
        depreciationlist8,
        residualvaluelist8,
        depreciationlist9,
        residualvaluelist9,
        depreciationlist10,
        residualvaluelist10,
        depreciationlist11,
        residualvaluelist11,
        depreciationlist12,
        residualvaluelist12,
    };
}

function fncSUM() {
        var depreciationlist1 = fncDEPRECIATION().depreciationlist1;
        var depreciationlist2 = fncDEPRECIATION().depreciationlist2;
        var depreciationlist3 = fncDEPRECIATION().depreciationlist3;
        var depreciationlist4 = fncDEPRECIATION().depreciationlist4;
        var depreciationlist5 = fncDEPRECIATION().depreciationlist5;
        var depreciationlist6 = fncDEPRECIATION().depreciationlist6;
        var depreciationlist7 = fncDEPRECIATION().depreciationlist7;
        var depreciationlist8 = fncDEPRECIATION().depreciationlist8;
        var depreciationlist9 = fncDEPRECIATION().depreciationlist9;
        var depreciationlist10 = fncDEPRECIATION().depreciationlist10;
        var depreciationlist11 = fncDEPRECIATION().depreciationlist11;
        var depreciationlist12 = fncDEPRECIATION().depreciationlist12;
        var residualvaluelist1 = fncDEPRECIATION().residualvaluelist1;
        var residualvaluelist2 = fncDEPRECIATION().residualvaluelist2;
        var residualvaluelist3 = fncDEPRECIATION().residualvaluelist3;
        var residualvaluelist4 = fncDEPRECIATION().residualvaluelist4;
        var residualvaluelist5 = fncDEPRECIATION().residualvaluelist5;
        var residualvaluelist6 = fncDEPRECIATION().residualvaluelist6;
        var residualvaluelist7 = fncDEPRECIATION().residualvaluelist7;
        var residualvaluelist8 = fncDEPRECIATION().residualvaluelist8;
        var residualvaluelist9 = fncDEPRECIATION().residualvaluelist9;
        var residualvaluelist10 = fncDEPRECIATION().residualvaluelist10;
        var residualvaluelist11 = fncDEPRECIATION().residualvaluelist11;
        var residualvaluelist12 = fncDEPRECIATION().residualvaluelist12;

// それぞれの資産の計算された初年度から5年後までの償却額と残価(６行目まで）から、最後の行に合計を計算して記入。
// 先ずは最後の行”合計”の、（初年度〜5年目）償却額をリスト化する        
        var depreciationSUM = [
            depreciationlist1[0] + depreciationlist2[0] + depreciationlist3[0] + depreciationlist4[0] + depreciationlist5[0] + depreciationlist6[0] + depreciationlist7[0] + depreciationlist8[0] + depreciationlist9[0] + depreciationlist10[0] + depreciationlist11[0] + depreciationlist12[0], 
            depreciationlist1[1] + depreciationlist2[1] + depreciationlist3[1] + depreciationlist4[1] + depreciationlist5[1] + depreciationlist6[1] + depreciationlist7[1] + depreciationlist8[1] + depreciationlist9[1] + depreciationlist10[1] + depreciationlist11[1] + depreciationlist12[1], 
            depreciationlist1[2] + depreciationlist2[2] + depreciationlist3[2] + depreciationlist4[2] + depreciationlist5[2] + depreciationlist6[2] + depreciationlist7[2] + depreciationlist8[2] + depreciationlist9[2] + depreciationlist10[2] + depreciationlist11[2] + depreciationlist12[2], 
            depreciationlist1[3] + depreciationlist2[3] + depreciationlist3[3] + depreciationlist4[3] + depreciationlist5[3] + depreciationlist6[3] + depreciationlist7[3] + depreciationlist8[3] + depreciationlist9[3] + depreciationlist10[3] + depreciationlist11[3] + depreciationlist12[3], 
            depreciationlist1[4] + depreciationlist2[4] + depreciationlist3[4] + depreciationlist4[4] + depreciationlist5[4] + depreciationlist6[4] + depreciationlist7[4] + depreciationlist8[4] + depreciationlist9[4] + depreciationlist10[4] + depreciationlist11[4] + depreciationlist12[4], 
            depreciationlist1[5] + depreciationlist2[5] + depreciationlist3[5] + depreciationlist4[5] + depreciationlist5[5] + depreciationlist6[5] + depreciationlist7[5] + depreciationlist8[5] + depreciationlist9[5] + depreciationlist10[5] + depreciationlist11[5] + depreciationlist12[5],
            depreciationlist1[6] + depreciationlist2[6] + depreciationlist3[6] + depreciationlist4[6] + depreciationlist5[6] + depreciationlist6[6] + depreciationlist7[6] + depreciationlist8[6] + depreciationlist9[6] + depreciationlist10[6] + depreciationlist11[6] + depreciationlist12[6]
        ];

//　そして最後の行”合計”の、取得金額と（初年度〜5年目）残価をリスト化する 
var residualvalueSUM = [
            residualvaluelist1[0] + residualvaluelist2[0] + residualvaluelist3[0] + residualvaluelist4[0] + residualvaluelist5[0] + residualvaluelist6[0] + residualvaluelist7[0] + residualvaluelist8[0] + residualvaluelist9[0] + residualvaluelist10[0] + residualvaluelist11[0] + residualvaluelist12[0], 
            residualvaluelist1[1] + residualvaluelist2[1] + residualvaluelist3[1] + residualvaluelist4[1] + residualvaluelist5[1] + residualvaluelist6[1] + residualvaluelist7[1] + residualvaluelist8[1] + residualvaluelist9[1] + residualvaluelist10[1] + residualvaluelist11[1] + residualvaluelist12[1], 
            residualvaluelist1[2] + residualvaluelist2[2] + residualvaluelist3[2] + residualvaluelist4[2] + residualvaluelist5[2] + residualvaluelist6[2] + residualvaluelist7[2] + residualvaluelist8[2] + residualvaluelist9[2] + residualvaluelist10[2] + residualvaluelist11[2] + residualvaluelist12[2], 
            residualvaluelist1[3] + residualvaluelist2[3] + residualvaluelist3[3] + residualvaluelist4[3] + residualvaluelist5[3] + residualvaluelist6[3] + residualvaluelist7[3] + residualvaluelist8[3] + residualvaluelist9[3] + residualvaluelist10[3] + residualvaluelist11[3] + residualvaluelist12[3], 
            residualvaluelist1[4] + residualvaluelist2[4] + residualvaluelist3[4] + residualvaluelist4[4] + residualvaluelist5[4] + residualvaluelist6[4] + residualvaluelist7[4] + residualvaluelist8[4] + residualvaluelist9[4] + residualvaluelist10[4] + residualvaluelist11[4] + residualvaluelist12[4], 
            residualvaluelist1[5] + residualvaluelist2[5] + residualvaluelist3[5] + residualvaluelist4[5] + residualvaluelist5[5] + residualvaluelist6[5] + residualvaluelist7[5] + residualvaluelist8[5] + residualvaluelist9[5] + residualvaluelist10[5] + residualvaluelist11[5] + residualvaluelist12[5],
            residualvaluelist1[6] + residualvaluelist2[6] + residualvaluelist3[6] + residualvaluelist4[6] + residualvaluelist5[6] + residualvaluelist6[6] + residualvaluelist7[6] + residualvaluelist8[6] + residualvaluelist9[6] + residualvaluelist10[6] + residualvaluelist11[6] + residualvaluelist12[6]
        ];
        console.log(depreciationSUM);
        console.log(residualvalueSUM);
// 最後の行”合計”の行のそれぞれの項目に、二つのリストから要素を取り出して挿入する
        document.depreciation.residualvalueSum_0.value = residualvalueSUM[0].toLocaleString();
        document.depreciation.depreciationSum_1.value = depreciationSUM[0].toLocaleString();
        document.depreciation.depreciationSum_2.value = depreciationSUM[1].toLocaleString();
        document.depreciation.depreciationSum_3.value = depreciationSUM[2].toLocaleString();
        document.depreciation.depreciationSum_4.value = depreciationSUM[3].toLocaleString();
        document.depreciation.depreciationSum_5.value = depreciationSUM[4].toLocaleString();
        document.depreciation.depreciationSum_6.value = depreciationSUM[5].toLocaleString();
        document.depreciation.residualvalueSum_1.value = residualvalueSUM[1].toLocaleString();
        document.depreciation.residualvalueSum_2.value = residualvalueSUM[2].toLocaleString();
        document.depreciation.residualvalueSum_3.value = residualvalueSUM[3].toLocaleString();
        document.depreciation.residualvalueSum_4.value = residualvalueSUM[4].toLocaleString();
        document.depreciation.residualvalueSum_5.value = residualvalueSUM[5].toLocaleString();
        document.depreciation.residualvalueSum_6.value = residualvalueSUM[6].toLocaleString();

        for (var i = 0; i <= 6; i++) {
            document.getElementsByName("gex26_" + i)[0].value = depreciationSUM[i];
            document.getElementsByName("DEPRECIATION_" + i)[0].value = depreciationSUM[i];
        }
}

function calculateRepayment() {
    var a = parseFloat(document.getElementsByName("repaymentYears")[0].value);
    var b = parseFloat(document.getElementsByName("repaymentMonths")[0].value) || 0;
    var totalMonths = a * 12 + b;    // 返済期間を月数に変換
    var c = parseFloat(document.getElementsByName("holdMonths")[0].value);    // 元金据え置き期間を月数に変換  
    var r = parseFloat(document.getElementsByName("interestRate")[0].value);
    var monthlyInterest = r / 12 / 100;    // 金利を月利に変換
    var x = parseFloat(document.getElementsByName("loanAmount")[0].value);
    var monthlyInterestRepayment = x * 10000 * monthlyInterest;   //毎月の利息金額
    var totalInterest = monthlyInterestRepayment * totalMonths;   //利息合計
    var totalRepayment = x * 10000 + totalInterest;    //全体の返済額
    var monthlyPrincipalRepayment = x * 10000 / (totalMonths - c);    // 毎月の元金返済額
    var repaymentSchedule = [];    //毎月の返済額をリストにする
    var repaymentSchedulePrincipal = [];    //うち元金
    var repaymentScheduleInterest = [];     //うち利息分
    for (var i = 0; i < c; i++) {
        repaymentSchedule.push(Math.round(monthlyInterestRepayment));
        repaymentScheduleInterest.push(Math.round(monthlyInterestRepayment));
        repaymentSchedulePrincipal.push(0); 
    }
    for (var i = c; i < totalMonths; i++) {
        repaymentSchedule.push(Math.round(monthlyPrincipalRepayment + monthlyInterestRepayment));
        repaymentScheduleInterest.push(Math.round(monthlyInterestRepayment));
        repaymentSchedulePrincipal.push(Math.round(monthlyPrincipalRepayment));
    }
    document.getElementsByName("totalRepayment")[0].value = totalRepayment.toLocaleString();
    document.getElementsByName("totalInterest")[0].value = totalInterest.toLocaleString();
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
        if(!isNaN(a) && !isNaN(b) && !isNaN(c)){
            ordinaryProfit = a + b - c - d;
        }
        document.getElementsByName("ordinaryProfit_" + i)[0].value = ordinaryProfit;
    }    
    return ordinaryProfit;
}

function fncNETINCOMEBEFORETAX() {
    var depreciationSUM = fncDEPRECIATION().depreciationSUM;
    var ordinaryProfit = fncORDINARYPROFIT().ordinaryProfit;    
    for (var i = 0; i <= 5; i++) {
        var a = parseFloat(document.getElementsByName("ordinaryProfit_" + i)[0].value);
        var b = parseFloat(document.getElementsByName("extraordinaryProfit_" + i)[0].value);
        var c = parseFloat(document.getElementsByName("extraordinaryLoss_" + i)[0].value);
        var d = parseFloat(document.getElementsByName("DEPRECIATION_" + 1)[0].value);
        var netincomeBeforetax;
        var corporateTax;
        var netincomeFortheperiod;
        var repayable;
            netincomeBeforetax = a + b - c;
            corporateTax = (a + b - c) * 0.3;
            netincomeFortheperiod = netincomeBeforetax - corporateTax;
            repayable = netincomeBeforetax - corporateTax + d;
            document.getElementsByName("netincomeBeforetax_" + i)[0].value = netincomeBeforetax.toLocaleString();
            document.getElementsByName("corporateTax_" + i)[0].value = corporateTax.toLocaleString();
            document.getElementsByName("netincomeFortheperiod_" + i)[0].value = netincomeFortheperiod.toLocaleString();
            document.getElementsByName("REPAYABLE_" + i)[0].value = Math.round(repayable).toLocaleString();
   }
    return netincomeFortheperiod;
}

