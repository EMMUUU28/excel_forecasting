// import React, { useState, useEffect } from "react";
// import { ChevronDown, Filter, Check, X, List } from "lucide-react";

// const productData = {
//   "Bridge Gem742": {
//     "Pid_to_all": [
//       "CA5032H7A8YG0", "B47715CRCHE", "W81825COPP-E", "SJX41705COPPCWCE",
//       "SAX5962AA8E1PKCH", "CJ4354Z1ZZYG0", "CJ7214X0ZZSZ0", "CJ7214X0ZZSZ0",
//       "51-342", "40-Y80", "W81805APD-E", "B47715APDCH-E", "CJ7214X0ZZSZ0",
//       "51-342", "40-Y80", "W81805APD-E"
//     ],
//     "Pid_to_review": [
//       "CA5032H7A8YG0", "B47715CRCHE", "W81825COPP-E", "SJX41705COPPCWCE",
//       "SAX5962AA8E1PKCH", "CJ4354Z1ZZYG0", "CJ7214X0ZZSZ0", "CJ7214X0ZZSZ0",
//       "51-342", "40-Y80", "W81805APD-E", "B47715APDCH-E"
//     ],
//     "Pid_to_best_selling": [
//       "CA5032H7A8YG0", "B47715CRCHE", "W81825COPP-E", 
//       "SJX41705COPPCWCE", "SAX5962AA8E1PKCH", "CJ4354Z1ZZYG0"
//     ],
//     "Pid_to_min_order": ["CA5032H7A8YG0", "B47715CRCHE", "W81825COPP-E"],
//     "Pid_to_birthstone": ["W81805CEP-E", "B47715CEPCHE", "CA5032H7A8YG0"],
//     "Pid_to_notify_to_macy": [
//       "B47715CWCH", "CJ0002H2ZZAG0", "W81805CEP-E", "CA5032H7A8YG0",
//       "SJX42105CRCWCE", "SAX5962AA8E1PKCH", "59-U19P", "W7988WSZW-E",
//       "59-U26P", "40G28W", "CA4185X1ZZSG0", "CJ7214X0ZZSZ0",
//       "CJ4249X0ZZSG0", "CA9068X1ZZSI4", "CA5032A3A8YG0", "CA5032B2A8SG0",
//       "51-342", "40-Y80", "CJ0002G1ZZAG0", "CA5032Q3A8SG0", "59-L97FPX",
//       "W8180A5AML-E", "W81805AG-E", "W81805APQW-E", "B4771A5MLCH-E", 
//       "B47715APQWC-E", "PA4520P1A8YG0"
//     ],
//     "Pid_to_Store_product": [
//       "B47715CWCH", "W81805CSW-E", "CA5032H1A8SG0", "W81805CW", "CA5032H9A8YG0",
//       "B47715CSWCHE", "CJ0002H2ZZAG0", "SJX41675CSCWCE", "SJX41655CSCWCE", 
//       "CJ9144H9ZZYF1", "W81805CEP-E", "B47715CEPCHE", "CA5032H7A8YG0", 
//       "66-U03", "W81805CR-E", "CA5032H3A8YG0", "CJ6289H3H9YG0", "B47715CRCHE", 
//       "87-T81P", "SAX43275CRCWCE", "CJ0021H3H9YG1", "SJX42105CRCWCE", 
//       "PA7266P3F4YZ0", "67-366", "67-006", "W81825COPP-E", "B47745COPPCE", 
//       "CA5035H8A8YG0", "SJX41705COPPCWCE", "SJX71315COPPCW-E", "CA5032C1A8YG0", 
//       "SAX5962AA8E1PKCH", "40-V28", "59-U19P", "W7988WSZW-E", "40G28", "40E13W", 
//       "40E13", "M76275WSZ-E", "CJ4354Z1ZZYG0", "59-U26P", "M7613SZ-E", 
//       "M7613SZW-E", "M76275WSZW-E", "59-V43P", "40G28W", "CA4185X1ZZSG0", 
//       "CJ7214X0ZZSZ0", "CJ4251X0ZZSG0", "59-W53P", "CJ4249X0ZZSG0", 
//       "CA9068X1ZZSI4", "CA5032A3A8YG0", "CA5032B2A8SG0", "ESM4882LBSPCH", 
//       "51-342", "59-L97OP", "40-Y80", "CA5032G1A8YG0", "CJ0002G1ZZAG0", 
//       "CA5032K1A8YG0", "CA5032Q3A8SG0", "F8985ZZXMSJ5", "59-L97FPX", 
//       "W8180A5AML-E", "W81805ABTSW-E", "W81805AG-E", "W81805APD-E", 
//       "W81805APQW-E", "W81805ACN-E", "B4771A5MLCH-E", "B47715APQWC-E", 
//       "B47715AGCH-E", "B47715APDCH-E", "B4771ABTSWC-E", "B47715ACNCH-E", 
//       "31-G65", "59-W24P", "SB54195CWCHE", "PA4520P1A8YG0"
//     ],
//     "Pid_to_com_product": ["31-G65", "59-W24P", "SB54195CWCHE", "PA4520P1A8YG0"]
//   },
//   "Gold262&270": {
//     "Pid_to_all": [
//       "E25-8363BD-3C", "C10-120L-75", "263.020.16", "B10-416CC-R",
//       "FRE029273Y50", "E10-5273-Y", "FRE076657Y", "E25-8363BD-3C",
//       "FRN017149Y8", "FRB014164Y75", "TRB079716Y9", "64304522"
//     ],
//     "Pid_to_review": [
//       "E25-8363BD-3C", "C10-120L-75", "263.020.16", "B10-416CC-R"
//     ],
//     "Pid_to_best_selling": ["263.020.16", "B10-416CC-R"],
//     "Pid_to_min_order": ["LTU048", "FRE029273Y50", "E10-5273-Y", "FRE076657Y"],
//     "Pid_to_birthstone": [],
//     "Pid_to_notify_to_macy": [
//       "LTU048", "FRE029273Y50", "E10-5273-Y", "FRE076657Y",
//       "E25-8363BD-3C", "FRN017149Y8", "FRB014164Y75", "TRB079716Y9",
//       "64304522", "CM-7888-16", "FRC047851W18", "TRC070342B18",
//       "VE-028D-W-18MCY", "F10-150L-22", "TRC013551Y26", "CU-120L-20",
//       "TRC075592Y75", "B10-416CC-R", "B10-316-P01-7K"
//     ],
//     "Pid_to_Store_product": [
//       "LTU048", "LTU.010", "LTU.029SQ", "LTU.105", "LTU058", "FRE029273Y50",
//       "FRE028549Y", "FRE047054Y40", "FRE079016Y", "NLS.014", "1FRE022570Y40",
//       "FRE031280Y", "FRE065855Y20", "LTU048W", "E10-5273-2C", "FRE022091Y28",
//       "FRE063505Y60", "LTU.029SQW", "FRE018875Y", "LTU.001", "FRE061581Y20",
//       "LTU.073", "FRE043582Y50", "LTU.035", "FRE029264Y35", "E10-5273-Y",
//       "LTU.014", "FRE029317Y", "FRE064686Y30", "E10-4040", "E10-5273-W",
//       "FRE043582Y40", "FRE076657Y", "53.F03-10ZC-MCY", "53.F03-8ZC-MCY",
//       "FRE080189Y", "E25-8363BD-3C", "BC10210H20", "FRN017149Y8", "FRN043666Y7",
//       "AV-26AGL-17", "TRF073403Y18", "FRF006415Y17", "FE-8363BD3C-17",
//       "FRF019249Y18", "TRC013552Y85M", "F10-150L-8.5", "C10-120L-085",
//       "FRB014164Y75", "FRB073409Y8", "C10-120L-75", "TRB079716Y9", "TRB070165Y75",
//       "643.060.20", "643.070.24", "FRF038211Y22", "64304518", "030DGLL-24",
//       "643.060.24", "64304522", "023OUL-8 5", "FRC065195Y18", "33OUL-22-10K",
//       "FRF003743Y18", "TRC072863Y75", "040OUL-24", "643.030.18", "643.030.24",
//       "FRC065195Y22", "643.030.20", "TRC074921Y75", "018OUL-16", "TRC070755Y18",
//       "643.030.16M", "018OUL-24", "TRH4223-22", "260.8R.16", "263.020.16",
//       "643.045W.20", "012DGLL-18", "TRC070342B16", "FRC047851Y18", "FRC038589W18",
//       "VE-028D-18MCY", "TRC070340Y20", "TRC070339Y22", "030DGLL-22-M", "263.020.18",
//       "260.8R.18MCY", "FRC047851Y20", "TRC070339Y20", "FRC079188Y20", "263020W20",
//       "CM-7888-16", "263.020.20", "FRC047851W18", "TRC070342B18", "VE-028D-W-18MCY",
//       "263.020W.16", "263.020W.18", "TRC004445Y16", "TRC013551Y22M", "CU-120L-22",
//       "TRC013551Y24", "FG-120L-22", "F10-150L-22", "C10-160L-22", "FFC014215Y22",
//       "G10-180L-8.5", "TRC013551Y26", "CU-120L-20", "TRC075592Y75", "FFC014215Y20",
//       "TRC013551Y20", "FRC042202Y18", "B10-416CC-R", "TRG077978Y7", "1BG-316-P01-RM",
//       "B10-316-P01-7K", "18OUL-7.5-10"
//     ],
//     "Pid_to_com_product": [
//       "B10-416CC-R", "TRG077978Y7", "1BG-316-P01-RM", "B10-316-P01-7K", "18OUL-7.5-10"
//     ]
//   },
//   "Womens Silver260&404": {
//     "Pid_to_all": [
//       "VSE078620Y40", "VSE078620Y40", "VSE078620Y40", "VSE078620Y15",
//       "VSE078620Y30", "PJ7145P0ZZSZ0", "SSE069950S15", "SSE069950S30",
//       "PJ7145P0ZZYZ0", "SSC065765S22", "SSC065765S22", "SSC067106S18",
//       "SSC067106S18", "SSC067099S18", "VSC067103Y20", "VSC067103Y20",
//       "SSC068515S18", "VSC076832Y75", "VSC076832Y75", "VSC067104Y75",
//       "VSC067104Y75", "SSC067104S75", "VSC067106Y75", "VSC067106Y75",
//       "SSC068515S10"
//     ],
//     "Pid_to_review": [
//       "VSE078620Y40", "PJ7145P0ZZYZ0", "SSC065765S22", "SSC065765S22",
//       "SSC067106S18", "SSC067106S18", "SSC067099S18", "VSC067103Y20",
//       "VSC067103Y20", "SSC068515S18", "VSC076832Y75", "VSC076832Y75",
//       "VSC067104Y75", "VSC067104Y75", "SSC067104S75", "VSC067106Y75",
//       "VSC067106Y75", "SSC068515S10"
//     ],
//     "Pid_to_best_selling": [
//       "SSC067104S75", "VSC067106Y75", "VSC067106Y75", "SSC068515S10"
//     ],
//     "Pid_to_min_order": [
//       "VSC067104Y75", "SSC067104S75", "VSC067106Y75", "VSC067106Y75", "SSC068515S10"
//     ],
//     "Pid_to_birthstone": ["VSE078620Y30"],
//     "Pid_to_notify_to_macy": [
//       "VSE078007Y36", "VSC065765Y18", "VSC067103Y18", "VSC067110Y24",
//       "VSC067104Y75", "VSC067106Y75"
//     ],
//     "Pid_to_Store_product": [
//       "PJ4075P0ZZYG1", "VSE078620Y40", "VSE078620Y15", "VSE078620Y30",
//       "SSE069950S40", "PJ7145P0ZZSZ0", "SSE069950S15", "SSE069950S30",
//       "PJ7145P0ZZYZ0", "VSE078007Y36", "SSC067113S22", "VSC067113Y22",
//       "SSC065765S22", "VSC067113Y24", "VSC067107Y22", "SSC067106S20",
//       "VSC067106Y20", "SSC067107S22", "SSC065765S20", "SSC067098S22",
//       "SSC067113S24", "VSC067106Y24", "SSC067112S22", "SSC067099S20",
//       "VSC065765Y20", "SSC067106S24", "VSC065765Y22", "VSC067113Y18",
//       "SSC067113S18", "VSC067104Y22", "VSC065765Y24", "SSC067104S22",
//       "VSC067112Y22", "SSC065765S24", "SSC067110S24", "SSC067106S18",
//       "VSC065765Y18", "SSC067099S18", "SSC067105S22", "VSC067103Y20",
//       "SSC067112S20", "VSC068515Y18", "SSC067112S18", "SSC068515S18",
//       "SSC067102S18", "VSC068515Y75", "VSC067106Y18", "VSC067102Y75",
//       "VSC067103Y18", "VSC076832Y75", "VSC067110Y24", "SSC067102S20",
//       "VSC067112Y18", "SSC068515S75", "VSC067104Y75", "SSC067104S75",
//       "VSC067103Y10", "SSC067103S20", "VSC068515Y10", "VSC067106Y75",
//       "SSC067108S20", "SSC067102S75", "SSC067106S75", "VSC076535Y75",
//       "SSC068515S10", "VSC067105Y10", "SSC067103S10", "SSC067105S10"
//     ],
//     "Pid_to_com_product": [
//       "VSC076535Y75", "SSC068515S10", "VSC067105Y10", "SSC067103S10", "SSC067105S10"
//     ]
//   },
//   "Precious264&268": {
//     "Pid_to_all": [
//       "RW817652SAWE", "CA5150H1LDEG1", "BX574152FKSKCH-E", "CA2451H3LDBG0",
//       "CA5150H3LDBG1", "BX574152FRBDCH-E", "BX747352FE1K", "CA6075E3ZZBG0",
//       "BX574152FE1KCH-E", "CA9114E4B6YC1"
//     ],
//     "Pid_to_review": ["RW817652SAWE", "CA5150H1LDEG1", "BX574152FKSKCH-E"],
//     "Pid_to_best_selling": [
//       "BX747352FE1K", "CA6075E3ZZBG0", "BX574152FE1KCH-E", "CA9114E4B6YC1"
//     ],
//     "Pid_to_min_order": [
//       "BX747352FE1K", "CA6075E3ZZBG0", "BX574152FE1KCH-E", "CA9114E4B6YC1"
//     ],
//     "Pid_to_birthstone": ["CA7986H1LDEZ0", "CA5147H1LDEG1", "CA7949H5LDBZ0"],
//     "Pid_to_notify_to_macy": [
//       "CA7986H1LDEZ0", "CA5147H1LDEG1", "CA7949H5LDBZ0", "CA7987H5LDBZ0",
//       "CA5185H5LDBG1", "CA5147H5LDBG1"
//     ],
//     "Pid_to_Store_product": [
//       "CA2444H1LDEG0", "CA2442H1LDEG0", "CA2421H1LDEG0", "AX87302FKSK",
//       "RW817652SAWE", "CA7986H1LDEZ0", "BX705352FKSK-E", "CA7502S4A7EZ0",
//       "CA7949H1LDEZ0", "CA5150H1LDEG1", "BX574152FKSKCH-E", "CA5147H1LDEG1",
//       "CA5184H1LDEG1", "CA2451H3LDBG0", "CA2504H3LDBG0", "AX79535RBDWS-EI",
//       "BX705352FRBD-E", "CA7949H3LDBZ0", "CA5150H3LDBG1", "BX574152FRBDCH-E",
//       "CA5147H3LDBG1", "CA2096E4B6YG1", "CA2423H5LDEG0", "CA1489E0A7BG1",
//       "CA2442H5LDBG0", "CA2450H5LDBG0", "AX79535E1KWS-E", "BX747352FE1K",
//       "M815252E1P-E", "BX705352FE1K-E", "CA7949H5LDBZ0", "CA7987H5LDBZ0",
//       "CA6075E3ZZBG0", "CA5185H5LDBG1", "CX416452FE1KCH-E", "BX574152FE1KCH-E",
//       "CA5147H5LDBG1", "CA9114E4B6YC1", "AX10495BMP-E"
//     ],
//     "Pid_to_com_product": ["BX583058PL2C18", "PA1065P5MDBG0", "AX195858PL2-E"]
//   },
//   "Fine Pearl265&271": {
//     "Pid_to_all": [
//       "BX712258PL2-E", "BX724958FMP-E", "M810752PF2-E", "BX712258PL2W",
//       "PA7613P1A7AZ0", "LE7379MIE", "LE7379MIE", "M561652PF2CE",
//       "M561652PF2CE", "M561652PF2CE", "BX583058PL2C18", "PA1065P5MDBG0",
//       "AX195858PL2-E"
//     ],
//     "Pid_to_review": [
//       "BX712258PL2-E", "BX724958FMP-E", "M810752PF2-E", "BX712258PL2W",
//       "PA7613P1A7AZ0", "AX195858PL2-E"
//     ],
//     "Pid_to_best_selling": [
//       "M561652PF2CE", "BX583058PL2C18", "PA1065P5MDBG0", "AX195858PL2-E"
//     ],
//     "Pid_to_min_order": [
//       "M561652PF2CE", "BX583058PL2C18", "PA1065P5MDBG0", "AX195858PL2-E"
//     ],
//     "Pid_to_birthstone": ["AX195858PL2-E"],
//     "Pid_to_notify_to_macy": ["LE7379MIE"],
//     "Pid_to_Store_product": [
//       "BX712258PL2-E", "BX724958FMP-E", "M810752PF2-E", "BX712258PL2W",
//       "PA7613P1A7AZ0", "LE7379MIE", "M561652PF2CE", "BX583058PL2C18",
//       "PA1065P5MDBG0", "AX195858PL2-E"
//     ],
//     "Pid_to_com_product": ["BX583058PL2C18", "PA1065P5MDBG0", "AX195858PL2-E"]
//   },
//   "Semi272&733": {
//     "Pid_to_all": [
//       "SM1067ASZW-E-M", "SW2318SZW-E", "SM1734SZW-E-M", "SSF035238SSCZ17",
//       "B1306ZZZASD0", "SBX74585MIX", "PA7044P1Z1SZ0", "PA7044P1Z1SZ0",
//       "PA7044P1Z1SZ0", "SBX74685MIX", "SAX88615AMX-E", "SSE037571SM1",
//       "SE6087SWH", "SE6087SWH", "SE6087SWH", "SRE070669SCZ", "CJ7440Z1ZZSZ0",
//       "SRE064237SSC", "CA4093Q4A7EG0", "CA4340B2B6BG0", "AX468552LBSCH-E",
//       "AX468552LBSCH-E", "AX80475AOX-E", "AX80475AOX-E", "CA1917G0A7BG0",
//       "AX1069A7GPPN", "CA5012G017BG0", "CA5012G017BG0", "AX7970A7GPPN",
//       "AX7970A7GPPN", "CA7536G0ZZQZ0", "CA5015C1A7BG0", "CA5015C1A7BG0",
//       "CA5015C1A7BG0", "AX7975A7CN", "AX7975A7CN", "AX1084A7FPDP", "AX79705A7FK2"
//     ],
//     "Pid_to_review": [
//       "SM1067ASZW-E-M", "SE6087SWH", "SRE070669SCZ", "CJ7440Z1ZZSZ0",
//       "SRE064237SSC", "CA4093Q4A7EG0", "CA4340B2B6BG0", "AX468552LBSCH-E",
//       "AX468552LBSCH-E", "AX80475AOX-E", "AX80475AOX-E", "CA1917G0A7BG0",
//       "AX1069A7GPPN", "CA5012G017BG0", "CA5012G017BG0", "AX7970A7GPPN",
//       "AX7970A7GPPN", "CA7536G0ZZQZ0", "CA5015C1A7BG0", "CA5015C1A7BG0",
//       "CA5015C1A7BG0", "AX7975A7CN", "AX7975A7CN", "AX1084A7FPDP", "AX79705A7FK2"
//     ],
//     "Pid_to_best_selling": [
//       "CA5015C1A7BG0", "AX7975A7CN", "AX7975A7CN", "AX1084A7FPDP", "AX79705A7FK2"
//     ],
//     "Pid_to_min_order": ["AX7975A7CN", "AX7975A7CN", "AX1084A7FPDP"],
//     "Pid_to_birthstone": ["SAX6575BMIX-E"],
//     "Pid_to_notify_to_macy": [
//       "SAX6575BMIX-E", "PJ6404P0Z1SE0", "CA1762A5A7HG0", "CA4444A5A7HG0",
//       "AX797052FM3-E", "AX468552LBSCH-E", "BX481552FOP1CE", "CA2313G017BG0",
//       "CA5012G017BG0", "BX4820A7GPPNCH", "CA7819G017BZ0"
//     ],
//     "Pid_to_Store_product": [
//       "SM1067ASZW-E-M", "SW2318SZW-E", "SM1734SZW-E-M", "SSF035238SSCZ17",
//       "SSF035236SM217", "SAX6575BMIX-E", "PJ6404P0Z1SE0", "CJ6366Z1ZZSG0",
//       "N0947ZZZASH0", "SM4522SZWCE", "CA4658Z2ZZSG1", "SZ6827ZWD18E",
//       "SSF032082SSZ18", "SM4525SZWCHE", "B1306ZZZASD0", "PJ9214P3Z1SF0",
//       "SBX74585MIX", "PA7044P1Z1SZ0", "SSE035236SM2-M", "SBX74685MIX",
//       "SAX88615AMX-E", "PJ7389P0Z1SZ0", "SSE037571SM1", "SE6087SWH",
//       "PJ7386P0Z1SZ0", "SRE070669SCZ", "CJ7440Z1ZZSZ0", "SRE064237SSC",
//       "SM7660SZW-E-M", "CJ7365Z1ZZSZ0", "PJ7384P0Z1SZ0", "CA4093Q4A7EG0",
//       "F8985A6QKEJ7", "AX797552QKW-E", "CA7087Q4A7EZ0", "CA1762A5A7HG0",
//       "AX106952FM3-E", "BX482052FM3CHE", "CA4444A5A7HG0", "AX497552FM3CHE",
//       "AX797052FM3-E", "AX797552M3-E", "CA7360A5A7HZ0", "CA4340B2B6BG0",
//       "AX468552LBSCH-E", "AX80475LBS-E", "AX797052LBTPPN-E", "CA7536B1ZZSZ0",
//       "BX766452FOP", "CA4972L2A7BG0", "BX481552FOP1CE", "AX108458FOX-E",
//       "AX80475AOX-E", "CA1917G0A7BG0", "AX1069A7GPPN", "CA2313G017BG0",
//       "CA4587G0A7BG0", "CA5012G017BG0", "BX4820A7GPPNCH", "AX7970A7GPPN",
//       "CA7819G017BZ0", "CA7536G0ZZQZ0", "AX1069A7FCN", "CA2311C1A7BG0",
//       "CA5015C1A7BG0", "BX4820A7FCNCH", "AX7975A7CN", "AX79705A7FCN",
//       "AX1084A7FPDP", "AX67925PD-18", "AX79705A7FK2", "AX79755A7K2"
//     ],
//     "Pid_to_com_product": [
//       "AX1084A7FPDP", "AX67925PD-18", "AX79705A7FK2", "AX79755A7K2"
//     ]
//   },
//   "Diamond734&737&748": {
//     "Pid_to_all": [
//       "SM91109", "SM91109", "SM91109F64", "SM91109F64", "SAX59372CHE",
//       "SAX59372CHE", "ESW45532C18E", "DA6605ZZA8AG0", "DA5306LD24SG0",
//       "DA5306LD24SG0", "DA7223LD23SZ0-M", "DA7223LD23SZ0-M", "DA7223LD23SZ0-M",
//       "DA4258LD23SG2", "DA4258LD23SG2", "DA4258LD23SG2", "DA7983LDMDSZ0",
//       "DA9104LD22SL0", "DA9104LD22SL0", "DA9104LD22SL0", "DA4324ZZ19QG0"
//     ],
//     "Pid_to_review": [
//       "SM91109", "DA5306LD24SG0", "DA5306LD24SG0", "DA7223LD23SZ0-M",
//       "DA7223LD23SZ0-M", "DA7223LD23SZ0-M", "DA4258LD23SG2", "DA4258LD23SG2",
//       "DA4258LD23SG2", "DA7983LDMDSZ0", "DA9104LD22SL0", "DA9104LD22SL0",
//       "DA9104LD22SL0", "DA4324ZZ19QG0"
//     ],
//     "Pid_to_best_selling": [
//       "DA9104LD22SL0", "DA9104LD22SL0", "DA9104LD22SL0", "DA4324ZZ19QG0"
//     ],
//     "Pid_to_min_order": ["DA9104LD22SL0", "DA9104LD22SL0", "DA4324ZZ19QG0"],
//     "Pid_to_birthstone": ["ESW45532C18E", "ESAX42639C18E"],
//     "Pid_to_notify_to_macy": [
//       "DA7176ZZA8AZ0", "DA4313ZZ16EG0", "SAX59372CHE", "ESW45532C18E",
//       "ESAX42639C18E", "ESB46099CHE", "DA8559LD23EZ0", "BA9025LD23ED0",
//       "BA3576LD22EG0", "BA3831LD22EG0", "BA4223LD22EG0", "DA5306LD24SG0",
//       "DA8021LDMDSZ0", "DA5093LDMDSG0", "DA4324ZZ19QG0"
//     ],
//     "Pid_to_Store_product": [
//       "SM91109", "SM91109F64", "DA7142ZZA8SZ1", "SM86949-E", "Z84742W-E",
//       "DA7249ZZA8IZ0", "DA7176ZZA8AZ0", "Z81022W-E", "DA4313ZZ16EG0",
//       "SAX59372CHE", "ESW45532C18E", "ESAX42639C18E", "ESB46099CHE",
//       "DA4282ZZ16EG0", "DJ4006ZP10SG1", "RAX60609W-E", "DA6605ZZA8AG0",
//       "DA8559LD23EZ0", "BA7407LDMDEZ0", "BA9025LD23ED0", "BA3576LD22EG0",
//       "BA3831LD22EG0", "BA4223LD22EG0", "BA4261LD22EG0", "DA5306LD24SG0",
//       "DA7223LD23SZ0-M", "DA8021LDMDSZ0", "DA5093LDMDSG0", "DA4258LD23SG2",
//       "DA7983LDMDSZ0", "DA1734LD22SG0", "DA8024LDMDSZ0", "DA9104LD22SL0",
//       "DA4324ZZ19QG0", "DA7314LD24SZ0-M"
//     ],
//     "Pid_to_com_product": [
//       "DA8024LDMDSZ0", "DA9104LD22SL0", "DA4324ZZ19QG0", "DA7314LD24SZ0-M"
//     ]
//   },
//   "Bridal739&267&263": {
//     "Pid_to_all": [
//       "BA7003LDM7EZ0", "BA7001LDM7EZ0", "BA7002LDM7EZ0", "BA2933LDM2PG0",
//       "W0869LD22EG3", "BA1120LD22EG0"
//     ],
//     "Pid_to_review": ["BA7003LDM7EZ0", "BA7001LDM7EZ0"],
//     "Pid_to_best_selling": ["BA7002LDM7EZ0", "BA2933LDM2PG0", "W0869LD22EG3"],
//     "Pid_to_min_order": ["BA2933LDM2PG0", "W0869LD22EG3", "BA1120LD22EG0"],
//     "Pid_to_birthstone": ["BA1237LDM2BG2"],
//     "Pid_to_notify_to_macy": [
//       "BA7040LDM7EZ0", "BA7155LDMDEZ0", "BA1341LD22EG0", "BA1237LDM2BG2",
//       "W0869LD22BG3"
//     ],
//     "Pid_to_Store_product": [
//       "BA7003LDM7EZ0", "BA7001LDM7EZ0", "BA7002LDM7EZ0", "BA7254LDM7EZ0",
//       "BA7001LDM7BZ0", "BA7040LDM7EZ0", "BA7003LDM7BZ0", "BA7155LDMDEZ0",
//       "LA1008LDMDEG0", "LA1007LDMDEG0", "BA2937LDM2EG2", "BA2934LDM2EG0",
//       "BA2935LDM2EG2", "BA2933LDM2EG2", "BA2933LDM2PG0", "BA2940LDM2EG0",
//       "BA2936LDM2EG0", "BA2932LDM2EG2", "BB1831LDM2EG0", "BA2957LDMDEG0",
//       "BB1313LD22EG0", "BA1577LDMDEG0", "BA2945LDMDEG0", "BA1085LDMDEG0",
//       "BA1576LDMDEG0", "BA2944LDMDEG0", "BA2943LDMDEG0", "BA2957LDMDPG0",
//       "BA1362LDM2EG0", "BA1237LD22EG1", "W0869LD22EG3", "BA1341LD22EG0",
//       "BA1078LD22EG0", "BA1237LDM2BG2", "BA1120LD22EG0", "W0869LD22BG3",
//       "BA4000LDM7EG0", "BA1808ZZ1AEG0", "DA6586ZZ1ABG2"
//     ],
//     "Pid_to_com_product": [
//       "BA1078LD22EG0", "BA1237LDM2BG2", "BA1120LD22EG0", "W0869LD22BG3",
//       "BA4000LDM7EG0", "BA1808ZZ1AEG0", "DA6586ZZ1ABG2"
//     ]
//   },
//   "Men's768&771": {
//     "Pid_to_all": [
//       "VSC076413Y22", "VSC076413Y22", "VSC076413Y20", "DA5055LD22AJ0",
//       "DA5055LD22AJ0", "DA3951LD22DM0", "DA8579LD22AZ0", "DA8579LD22AZ0",
//       "DA3949LD22NM0", "BB3937LD22NM1", "BB3937LD22NM1", "DA3900LD22DM0",
//       "DA3900LD22DM0", "DA5450LD22NJ0", "BB3938LD22AM0", "BB3938LD22AM0",
//       "VSC065755Y85", "VSC065759Y85", "VSC065759Y85", "VSC067135Y85",
//       "VSC067135Y85", "VSC076413Y9", "VSC076413Y9", "SSC065759S85",
//       "SSC065759S85", "TRK038292Y"
//     ],
//     "Pid_to_review": [
//       "VSC065755Y85", "VSC065759Y85", "VSC065759Y85", "VSC067135Y85",
//       "VSC067135Y85", "VSC076413Y9", "VSC076413Y9", "SSC065759S85",
//       "SSC065759S85", "TRK038292Y"
//     ],
//     "Pid_to_best_selling": ["SSC065759S85", "SSC065759S85", "TRK038292Y"],
//     "Pid_to_min_order": [
//       "VSC076413Y9", "SSC065759S85", "SSC065759S85", "TRK038292Y"
//     ],
//     "Pid_to_birthstone": [],
//     "Pid_to_notify_to_macy": [
//       "VSC066499Y24", "VSC065752Y22", "BA9077LD22DJ0", "BA3932LD23DM2",
//       "DA3951LD22DM0", "DA8579LD22AZ0", "DA3949LD22NM0", "BB3937LD22NM1",
//       "DA5450LD22NJ0", "BB3938LD22AM0", "VSC065755Y85", "VSC065759Y85",
//       "VSC076413Y9", "SSC065759S85"
//     ],
//     "Pid_to_Store_product": [
//       "M39004-10EI", "A10173-EI", "M39034W-10EI", "M39034-10EI",
//       "SSC065766S22", "VSC065766Y22", "VSC065755Y22", "VSC065766Y24",
//       "SSC065755S22", "SSC066499S24", "SSC065766S24", "VSC066498Y24",
//       "SSC065759S22", "SSC067135S24", "SSC067136S22", "VSC066499Y24",
//       "VSC067135Y22", "VSC067135Y24", "SSB018493S22", "VSC066499Y22",
//       "SSC067136S24", "SSC067135S22", "VSC076413Y22", "VSC076413Y20",
//       "VSC065752Y22", "VSC067102Y22", "BA9077LD22DJ0", "DA5055LD22AJ0",
//       "BA3932LD23DM2", "DA3951LD22DM0", "BB3983LD22DM0", "DA8579LD22AZ0",
//       "DA3949LD22NM0", "BB3937LD22NM1", "BB3985LD22DM0", "DA3950LD22DM0",
//       "DA7975LD22DZ0", "DA3900LD22DM0", "DA5450LD22NJ0", "DA7945LD22AZ0",
//       "DA8581LD22AZ0", "BB3938LD22AM0", "BA4241LD22NJ0", "BB3932LD22AM0",
//       "FRC072659Y9", "TRC069998Y85", "VSC065766Y85", "VSC065755Y85",
//       "VSC065759Y85", "VSC067135Y85", "SSC065766S85", "VSC076413Y9",
//       "SSC065759S85", "SSC080218S85", "VSC080218Y85", "FRK033040B18",
//       "TMK0402Y24", "FRK016964Y24", "TRK038292Y", "FRK072671Y"
//     ],
//     "Pid_to_com_product": [
//       "M39004-10EI", "A10173-EI", "M39034W-10EI", "M39034-10EI", "SSC065766S22",
//       "VSC065766Y22", "VSC065755Y22", "VSC065766Y24", "SSC065755S22", 
//       "SSC066499S24", "SSC065766S24", "VSC066498Y24", "SSC065759S22", 
//       "SSC067135S24", "SSC067136S22", "VSC066499Y24", "VSC067135Y22", 
//       "VSC067135Y24", "SSB018493S22", "VSC066499Y22", "SSC067136S24", 
//       "SSC067135S22", "VSC076413Y22", "VSC076413Y20", "VSC065752Y22", 
//       "VSC067102Y22", "BA9077LD22DJ0", "DA5055LD22AJ0", "BA3932LD23DM2", 
//       "DA3951LD22DM0", "BB3983LD22DM0", "DA8579LD22AZ0", "DA3949LD22NM0", 
//       "BB3937LD22NM1", "BB3985LD22DM0", "DA3950LD22DM0"
//     ]
//   }
// };

// function ProductSelector() {
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [displayedProducts, setDisplayedProducts] = useState([]);
//   const [activeFilters, setActiveFilters] = useState([]);
//   const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  
//   // Get unique products based on current filters
//   useEffect(() => {
//     if (!selectedCategory) {
//       setDisplayedProducts([]);
//       return;
//     }

//     const categoryData = productData[selectedCategory];
    
//     // If no filters are active, show all products
//     if (activeFilters.length === 0) {
//       setDisplayedProducts([...new Set(categoryData.Pid_to_all)]);
//       return;
//     }
    
//     // Combine products from all active filters
//     let filteredProducts = [];
//     activeFilters.forEach(filter => {
//       if (categoryData[filter]) {
//         filteredProducts = [...filteredProducts, ...categoryData[filter]];
//       }
//     });
    
//     // Remove duplicates
//     setDisplayedProducts([...new Set(filteredProducts)]);
//   }, [selectedCategory, activeFilters]);

//   // Handle category selection
//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     setActiveFilters([]);
//     setIsCategoryDropdownOpen(false);
//   };

//   // Toggle filter selection
//   const toggleFilter = (filter) => {
//     if (activeFilters.includes(filter)) {
//       setActiveFilters(activeFilters.filter(f => f !== filter));
//     } else {
//       setActiveFilters([...activeFilters, filter]);
//     }
//   };

//   // All available filters
//   const allFilters = [
//     "Pid_to_review",
//     "Pid_to_best_selling",
//     "Pid_to_min_order",
//     "Pid_to_birthstone",
//     "Pid_to_notify_to_macy",
//     "Pid_to_Store_product",
//     "Pid_to_com_product"
//   ];

//   return (
//     <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-6">
//         <h1 className="text-2xl font-bold text-white">Product Selector</h1>
//         <p className="text-indigo-100 mt-1">
//           Select a category and apply filters to find products
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
//         {/* Category Column */}
//         <div className="md:col-span-3 bg-gray-50 p-4 border-r border-gray-200">
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
//               <List size={18} className="mr-2 text-indigo-600" />
//               Categories
//             </h2>
            
//             <div className="relative">
//               <button
//                 className="w-full text-left flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white hover:border-indigo-300 transition-colors"
//                 onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
//               >
//                 <span className={selectedCategory ? "text-gray-800" : "text-gray-500"}>
//                   {selectedCategory || "Select Category"}
//                 </span>
//                 <ChevronDown
//                   size={18}
//                   className={`text-gray-500 transition-transform duration-200 ${
//                     isCategoryDropdownOpen ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>
              
//               {isCategoryDropdownOpen && (
//                 <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
//                   {Object.keys(productData).map((category) => (
//                     <button
//                       key={category}
//                       className={`w-full text-left p-3 hover:bg-indigo-50 transition-colors ${
//                         selectedCategory === category ? "bg-indigo-50 text-indigo-700" : ""
//                       }`}
//                       onClick={() => handleCategoryChange(category)}
//                     >
//                       {category}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {selectedCategory && (
//             <div>
//               <h3 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
//                 <Filter size={16} className="mr-2 text-indigo-500" />
//                 Filters
//               </h3>
//               <div className="space-y-2">
//                 {allFilters.map((filter) => (
//                   <div
//                     key={filter}
//                     className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
//                       activeFilters.includes(filter)
//                         ? "bg-indigo-50 border border-indigo-200"
//                         : "hover:bg-gray-100 border border-transparent"
//                     }`}
//                     onClick={() => toggleFilter(filter)}
//                   >
//                     <div
//                       className={`w-5 h-5 rounded flex items-center justify-center mr-3 ${
//                         activeFilters.includes(filter)
//                           ? "bg-indigo-600 text-white"
//                           : "border border-gray-300"
//                       }`}
//                     >
//                       {activeFilters.includes(filter) && <Check size={14} />}
//                     </div>
//                     <span className="text-sm">{filter.replace("Pid_to_", "")}</span>
//                     <span className="ml-auto text-xs text-gray-500">
//                       {productData[selectedCategory] && 
//                        productData[selectedCategory][filter] ? 
//                        productData[selectedCategory][filter].length : 0}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Products Column */}
//         <div className="md:col-span-9 p-6">
//           {selectedCategory ? (
//             <>
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   {selectedCategory} Products
//                 </h2>
//                 <div className="flex items-center text-sm text-gray-500">
//                   <span className="mr-2">Products:</span>
//                   <span className="font-medium text-indigo-700">
//                     {displayedProducts.length}
//                   </span>
//                   {activeFilters.length > 0 && (
//                     <button
//                       className="ml-4 text-indigo-600 hover:text-indigo-800 flex items-center"
//                       onClick={() => setActiveFilters([])}
//                     >
//                       <X size={14} className="mr-1" /> Clear filters
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {activeFilters.length > 0 && (
//                 <div className="mb-6 flex flex-wrap items-center gap-2">
//                   <span className="text-sm text-gray-600">Active filters:</span>
//                   {activeFilters.map((filter) => (
//                     <div key={filter} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm flex items-center">
//                       {filter.replace("Pid_to_", "")}
//                       <button
//                         className="ml-2 text-indigo-400 hover:text-indigo-600"
//                         onClick={() => toggleFilter(filter)}
//                       >
//                         <X size={14} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {displayedProducts.length > 0 ? (
//                 <div className="bg-white rounded-lg border border-gray-200">
//                   <ul className="divide-y divide-gray-200 max-h-[60vh] overflow-y-auto">
//                     {displayedProducts.map((product, index) => (
//                       <li
//                         key={`${product}-${index}`}
//                         className="px-4 py-3 hover:bg-gray-50 transition-colors"
//                       >
//                         <div className="flex justify-between items-center">
//                           <span className="text-gray-800 font-medium">{product}</span>
//                           <div className="flex space-x-2">
//                             {/* We could add actions here like view details, etc. */}
//                           </div>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ) : (
//                 <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
//                   <p className="text-gray-500">
//                     {activeFilters.length > 0
//                       ? "No products match the selected filters"
//                       : "No products available for this category"}
//                   </p>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="text-center p-12 bg-gray-50 rounded-lg border border-gray-200">
//               <h2 className="text-xl font-semibold text-gray-700 mb-2">
//                 Please Select a Category
//               </h2>
//               <p className="text-gray-500">
//                 Choose a category from the left sidebar to view products
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductSelector;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown, Filter, Check, X, List, Eye } from "lucide-react";
import ProductDetailsView from "./ProductDetailsView";
import { 
  setSelectedCategory, 
  toggleFilter, 
  clearFilters, 
  setSelectedProduct,
  selectCategory,
  selectActiveFilters,
  selectSelectedProduct,
  selectDisplayedProducts,
  setProductData
} from "../redux/productSlice";
import { getMockProductData } from "../services/productService";

// Define allFilters outside the component to avoid reference errors
const allFilters = [
  "Pid_to_review",
  "Pid_to_best_selling",
  "Pid_to_min_order",
  "Pid_to_birthstone",
  "Pid_to_notify_to_macy",
  "Pid_to_Store_product",
  "Pid_to_com_product"
];

function ProductSelector() {
  const dispatch = useDispatch();
  
  // Redux state
  const selectedCategory = useSelector(selectCategory);
  const activeFilters = useSelector(selectActiveFilters);
  const selectedProduct = useSelector(selectSelectedProduct);
  const displayedProducts = useSelector(selectDisplayedProducts);
  
  // Get all filter counts at once to avoid hooks in loops
  const filterCounts = useSelector(state => {
    const categoryData = state.products.productData[selectedCategory];
    if (!categoryData) return {};
    
    const counts = {};
    allFilters.forEach(filter => {
      counts[filter] = categoryData[filter] ? categoryData[filter].length : 0;
    });
    return counts;
  });
  
  // Local state
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = React.useState(false);
  const [categories, setCategories] = React.useState([]);

  // On component mount, initialize with mock data
  // In a real app, this would fetch from API
  useEffect(() => {
    const productData = getMockProductData();
    dispatch(setProductData(productData));
    setCategories(Object.keys(productData));
  }, [dispatch]);

  // Handle category selection
  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category));
    setIsCategoryDropdownOpen(false);
  };

  // Toggle filter selection
  const handleToggleFilter = (filter) => {
    dispatch(toggleFilter(filter));
  };

  // Handle product selection
  const handleProductSelect = (productId) => {
    dispatch(setSelectedProduct({
      productId,
      category: selectedCategory
    }));
  };

  // Handle clearing filters
  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  // If a product is selected, show its details
  if (selectedProduct) {
    return (
      <ProductDetailsView 
        productId={selectedProduct.productId}
        category={selectedProduct.category}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-6">
        <h1 className="text-2xl font-bold text-white">Product Selector</h1>
        <p className="text-indigo-100 mt-1">
          Select a category and apply filters to find products
        </p>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* Category Column */}
        <div className="md:col-span-3 bg-gray-50 p-4 border-r border-gray-200">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <List size={18} className="mr-2 text-indigo-600" />
              Categories
            </h2>
            
            <div className="relative">
              <button
                className="w-full text-left flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white hover:border-indigo-300 transition-colors"
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              >
                <span className={selectedCategory ? "text-gray-800" : "text-gray-500"}>
                  {selectedCategory || "Select Category"}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-gray-500 transition-transform duration-200 ${
                    isCategoryDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              {isCategoryDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`w-full text-left p-3 hover:bg-indigo-50 transition-colors ${
                        selectedCategory === category ? "bg-indigo-50 text-indigo-700" : ""
                      }`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
  
          {selectedCategory && (
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
                <Filter size={16} className="mr-2 text-indigo-500" />
                Filters
              </h3>
              <div className="space-y-2">
                {allFilters.map((filter) => (
                  <div
                    key={filter}
                    className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
                      activeFilters.includes(filter)
                        ? "bg-indigo-50 border border-indigo-200"
                        : "hover:bg-gray-100 border border-transparent"
                    }`}
                    onClick={() => handleToggleFilter(filter)}
                  >
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center mr-3 ${
                        activeFilters.includes(filter)
                          ? "bg-indigo-600 text-white"
                          : "border border-gray-300"
                      }`}
                    >
                      {activeFilters.includes(filter) && <Check size={14} />}
                    </div>
                    <span className="text-sm">{filter.replace("Pid_to_", "")}</span>
                    <span className="ml-auto text-xs text-gray-500">
                      {filterCounts[filter] || 0}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
  
        {/* Products Column */}
        <div className="md:col-span-9 p-6">
          {selectedCategory ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {selectedCategory} Products
                </h2>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-2">Products:</span>
                  <span className="font-medium text-indigo-700">
                    {displayedProducts.length}
                  </span>
                  {activeFilters.length > 0 && (
                    <button
                      className="ml-4 text-indigo-600 hover:text-indigo-800 flex items-center"
                      onClick={handleClearFilters}
                    >
                      <X size={14} className="mr-1" /> Clear filters
                    </button>
                  )}
                </div>
              </div>
  
              {activeFilters.length > 0 && (
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-600">Active filters:</span>
                  {activeFilters.map((filter) => (
                    <div key={filter} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm flex items-center">
                      {filter.replace("Pid_to_", "")}
                      <button
                        className="ml-2 text-indigo-400 hover:text-indigo-600"
                        onClick={() => handleToggleFilter(filter)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
  
              {displayedProducts.length > 0 ? (
                <div className="bg-white rounded-lg border border-gray-200">
                  <ul className="divide-y divide-gray-200 max-h-[60vh] overflow-y-auto">
                    {displayedProducts.map((product, index) => (
                      <li
                        key={`${product}-${index}`}
                        className="px-4 py-3 hover:bg-gray-50 transition-colors flex justify-between items-center"
                      >
                        <span className="text-gray-800 font-medium">{product}</span>
                        <button
                          onClick={() => handleProductSelect(product)}
                          className="text-indigo-600 hover:text-indigo-800 flex items-center"
                        >
                          <Eye size={18} className="mr-2" /> View Details
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-500">
                    {activeFilters.length > 0
                      ? "No products match the selected filters"
                      : "No products available for this category"}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center p-12 bg-gray-50 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Please Select a Category
              </h2>
              <p className="text-gray-500">
                Choose a category from the left sidebar to view products
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductSelector;