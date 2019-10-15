const functions = require('firebase-functions');
const puppeteer = require('puppeteer');

exports.makePdf = functions.runWith({ memory: '1GB' }).https.onRequest(async (request, response) => {
  const htmlContent = `
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Faktúra 2018100001</title>
        <style>
            html, body {
                height: 297mm;
                width: 210mm;
                margin: 0;
                padding: 0;
                font-family: sans-serif;
            }
    
            h1 {
                margin: 0;
                font-weight: 200;
                font-size: 2em;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                color: rgba(0, 0, 0, 87);
            }
    
            span {
                color: rgba(0, 0, 0, 87);
            }
    
            h1 > span {
                font-weight: 300;
            }
    
            h2 {
                margin: 0;
                padding: 0;
                font-weight: 500;
                font-size: 1.3em;
                line-height: 1.6em;
            }
    
            .invoice-container {
                margin-top: 40px;
            }
    
            .label, .table-label {
                font-weight: 300;
                color: rgba(128, 128, 128, 87);
                font-size: 1em;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
    
            .label {
                margin-bottom: 10px;
            }
    
            .table-label {
                text-align: left;
            }
    
            .underline {
                display: inline-block;
                width: 100%;
                border-bottom: 1px solid rgba(204, 204, 204, 100);
            }
    
            .invoice {
                min-height: 289mm;
                width: 210mm;
                padding: 40px 60px 40px 60px;
                color: rgba(128, 128, 128, 87);
                font-size: 0.7em;
                background-color: white;
            }
    
            .flex-vertical {
                display: flex;
                flex-flow: column;
            }
    
            .flex {
                display: flex;
            }
    
            .flex-col, .flex-fill {
                flex: 1;
            }
    
            .flex-space-around {
                justify-content: space-between;
            }
    
            .property-group {
                margin-top: 10px;
            }
    
            .property {
                font-size: 1.4em;
                line-height: 1.6em;
                letter-spacing: 0.03em;
                color: rgba(0, 0, 0, 87);
                font-weight: 300;
            }
    
            .property > strong {
                font-size: 1.2em;
                font-weight: 500;
            }
    
            .items {
                margin-top: 40px;
                display: flex;
                flex-flow: column;
            }
    
            .items > table {
                width: 100%;
                padding: 0;
            }
    
            table {
                border-collapse: collapse;
            }
    
            table tr td, table tr th {
                padding: 0;
            }
    
            thead {
                border-bottom: 1px solid rgba(204, 204, 204, 100);
            }
    
            thead > tr > th {
                line-height: 4em;
            }
    
            tbody > tr {
                border-bottom: 1px solid rgba(204, 204, 204, 100);
                font-size: 1.4em;
                font-weight: 300;
                color: rgba(0, 0, 0, 87);
                letter-spacing: 0.05em;
            }
    
            tbody > tr:last-child {
                border-bottom: 0;
                color: rgba(0, 0, 0, 87);
                font-weight: 500;
                font-size: 1.4em;
            }
    
            tbody > tr:last-child > td > span {
                display: block;
                width: 70%;
                text-align: right;
                letter-spacing: 0.15em;
                color: rgba(0, 0, 0, 87);
                font-weight: 500;
                font-size: 1.1em;
                line-height: 6em;
            }
    
            tbody > tr > td {
                padding-top: 10px;
                padding-bottom: 10px;
            }
    
            .signature {
                text-transform: uppercase;
                font-size: 0.8em;
                letter-spacing: 0.05em;
                line-height: 2.5em;
                justify-content: flex-end;
                align-items: center;
                flex-flow: column;
                height: 100%;
                max-width: 300px;
                margin-left: 100px;
            }
    
            .title {
                color: rgba(0, 0, 0, 87);
                font-weight: 500;
            }
    
            .footer {
                height: 200px;
            }
    
            .property-row > div {
                margin-right: 10px;
            }
    
            a:hover {
                text-decoration: none;
            }
    
            td > input {
                display: inline-block;
                width: 95%;
                margin-top: 10px;
                margin-bottom: 10px;
            }
    
            .invoice-input-count {
                width: 60px !important;
            }
    
            .invoice-input-unit {
                width: 40px !important;
            }
    
            .invoice-input-per-unit-price {
                width: 110px !important;
            }
    
            .invoice-input-total-price {
                width: 110px !important;
            }
    
            .invoice-input-name {
                width: 300px !important;
            }
    
            .date-input {
                position: relative;
            }
    
            .square {
                height: 200px;
            }
    
        </style>
    </head>
    <body>
    <div class="flex-vertical invoice">
    
        <!-- číslo faktury -->
        <div>
            <h1>Faktúra 2018100001</h1>
            <div class="underline"></div>
        </div>
    
        <!-- Odberatel a dodavatel -->
        <div class="invoice-header">
            <div class="flex">
                <!-- Dodavatel -->
                <div class="flex-col">
                    <div class="invoice-container">
                        <div class="label">
                            Dodávateľ
                        </div>
    
                        <div class="property-group">
                                                    <div class="property">
                                <h2>Peter Štovka</h2>
                            </div>
                                                                            <div class="property">
                                Rastislavova 2151
                            </div>
                                                                                                    <div class="property-row flex">
                                                            <div class="property">
                                    09302
                                </div>
                                                                                        <div class="property">
                                    Hencovce
                                </div>
                                                        </div>
                                                                        </div>
    
                        <div class="property-group">
                                                    <div class="property">
                                IČO: 50898493
                            </div>
                            
                                                    <div class="property">
                                DIČ: 1123299826
                            </div>
                            
                                                                            <div class="property">
                                Nie je platiteľ DPH.
                            </div>
                                                </div>
    
                        <div class="property-group">
                                                    <div class="property">
                                E-Mail: stovka.peter@gmail.com
                            </div>
                            
                            
                                                    <div class="property">
                                Telefón: +421 950 498 911
                            </div>
                            
                                                    <div class="property">
                                Vystavil: Peter Štovka
                            </div>
                                                </div>
                    </div>
                </div>
    
                <!-- Odberatel -->
                <div class="flex-col">
                    <div class="invoice-container">
                        <div class="label">
                            Odberateľ
                        </div>
    
                        <div class="property-group">
                                                    <div class="property">
                                <h2>Vinisoft, s.r.o</h2>
                            </div>
                            
                                                    <div class="property position-relative">
                                Royova 4
                            </div>
                            
                            
                                                    <div class="property-row flex">
                                                            <div class="property">
                                    08005
                                </div>
                                
                                                            <div class="property">
                                    Prešov
                                </div>
                                                        </div>
                            
                                                </div>
    
                                            <div class="property-group">
                                                    <div class="property">
                                IČO: 46004360
                            </div>
                            
                                                    <div class="property">
                                DIČ: 2023183052
                            </div>
                            
                                                    <div class="property">
                                IČ DPH: SK2023183052
                            </div>
                                                </div>
                        
                                            <div class="underline"></div>
    
                        <div class="property-group">
                            <div class="label">
                                Platobné údaje pre platbu bankovým prevodom
                            </div>
    
                            
                                                    <div class="property">
                                IBAN: SK8511000000002917613377
                            </div>
                            
                                                    <div class="property">
                                VS: 2018100001
                            </div>
                            
                            <div class="property">
                                Suma k úhrade: 1050 €
                            </div>
                        </div>
                                        </div>
                </div>
            </div>
        </div>
    
        <!-- Datumy -->
        <div class="invoice-container">
            <div class="flex flex-space-around">
                <div class="flex-vertical date-input">
                    <div class="label">
                        Dátum vystavenia
                    </div>
                    <div class="property title">
                        01.10.2018
                    </div>
                </div>
    
                <div class="flex-vertical">
                    <div class="label">
                        Dátum dodania
                    </div>
                    <div class="property title">
                        01.11.2018
                    </div>
                </div>
    
                <div class="flex-vertical">
                    <div class="label">
                        Dátum splatnosti
                    </div>
                    <div class="property title">
                        15.10.2018
                    </div>
                </div>
    
                <div class="flex-vertical">
                    <div class="label">
                        Spôsob úhrady
                    </div>
                    <div class="property title">
                                                    Bankový Prevod
                                            </div>
                </div>
            </div>
        </div>
    
        <!-- Polozky faktury -->
        <div class="flex-fill">
            <div class="invoice-container items">
                <table>
                    <thead>
                    <tr>
                        <th class="table-label">Položka</th>
                        <th class="table-label">Počet</th>
                        <th class="table-label">MJ</th>
                        <th class="table-label">Jedn. cena</th>
                        <th class="table-label">Spolu</th>
                    </tr>
                    </thead>
                    <tbody>
                                    <tr>
                        <td class="invoice-input-name">Programátorské služby - single.de</td>
                        <td class="invoice-input-count">105</td>
                        <td class="invoice-input-unit">h</td>
                        <td class="invoice-input-per-unit-price">10</td>
                        <td class="invoice-input-total-price">1050</td>
                    </tr>
                                                    <tr>
                        <td colspan="4"><span>Celkom</span></td>
                        <td>1050 €</td>
                    </tr>
                                    </tbody>
                </table>
            </div>
        </div>
    
        <!-- Platobne udaje a podpis a peciatka -->
        <div class="flex footer">
            <!-- Platobne udaje -->
                    <div class="flex-col">
                <img class="square" src="data:image/png;base64,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" alt="paybysquare">
            </div>
            
            <!-- Podpis a pečiatka -->
            <div class="flex-col">
                <div class="flex-vertical signature">
                    <div class="flex"></div>
                    <div class="underline"></div>
                    <div>Pečiatka a podpis</div>
                </div>
            </div>
        </div>
    
    </div>
    
    </body>
    </html>
  `;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage()

  await page.setBypassCSP(true);
  await page.setContent(htmlContent);
  const buffer = await page.pdf({
    fullPage: true
  });

  response.type('application/pdf').send(buffer);
});
