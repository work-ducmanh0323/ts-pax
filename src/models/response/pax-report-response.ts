import AccountInformation from "./account-information";
import AmountInformation from "./amount-information";
import HostInformation from "./host-information";
import TraceInformation from "./trace-information";
import {hexToString, stringToHex} from "../../utils";

type PaxLocalDetailReportParams = {
    totalRecord: string;
    recordNumber: string;
    hostInformationRaw: string;
    hostInformation: HostInformation;
    edcType: string;
    paymentType: string;
    amountInformationRaw: string;
    amountInformation: AmountInformation;
    accountInformationRaw: string;
    accountInformation: AccountInformation;
    traceInformationRaw: string;
    traceInformation: TraceInformation;
    additionalInformationRaw: string;
}

class PaxLocalDetailReport {
    totalRecord: string; //6
    recordNumber: string; //7
    hostInformationRaw: string; //8
    hostInformation: HostInformation; //8
    edcType: string; //9
    paymentType: string; //10
    // unknown1: string; //11
    amountInformationRaw: string; //12
    amountInformation: AmountInformation; //12
    accountInformationRaw: string; // 13
    accountInformation: AccountInformation; //13
    traceInformationRaw: string; //14
    traceInformation: TraceInformation; //14
    // unknown2: string; //15
    // unknown3: string; //16
    // unknown4: string; //17
    additionalInformationRaw: string; //18

    constructor({
                    totalRecord,
                    recordNumber,
                    hostInformationRaw,
                    hostInformation,
                    edcType,
                    paymentType,
                    amountInformationRaw,
                    amountInformation,
                    accountInformationRaw,
                    accountInformation,
                    traceInformationRaw,
                    traceInformation,
                    additionalInformationRaw,
                }: PaxLocalDetailReportParams) {
        this.totalRecord = totalRecord;
        this.recordNumber = recordNumber;
        this.hostInformationRaw = hostInformationRaw;
        this.hostInformation = hostInformation;
        this.edcType = edcType;
        this.paymentType = paymentType;
        this.amountInformationRaw = amountInformationRaw;
        this.amountInformation = amountInformation;
        this.accountInformationRaw = accountInformationRaw;
        this.accountInformation = accountInformation;
        this.traceInformationRaw = traceInformationRaw;
        this.traceInformation = traceInformation;
        this.additionalInformationRaw = additionalInformationRaw;
    }

    static fromList(fields: any[]) {
        return new PaxLocalDetailReport({
            totalRecord: fields[6],
            recordNumber: fields[7],
            hostInformationRaw: fields[8],
            hostInformation: HostInformation.fromList(fields[8]),
            edcType: fields[9],
            paymentType: fields[10],
            amountInformationRaw: fields[12],
            amountInformation: AmountInformation.fromList(fields[12]),
            accountInformationRaw: fields[13],
            accountInformation: AccountInformation.fromList(fields[13]),
            traceInformationRaw: fields[14],
            traceInformation: TraceInformation.fromList(fields[14]),
            additionalInformationRaw: fields[18]
        });
    }

    toJson() {
        return {
            'totalRecord': this.totalRecord,
            'recordNumber': this.recordNumber,
            'hostInformationRaw': this.hostInformationRaw,
            'hostInformation': this.hostInformation,
            'edcType': this.edcType,
            'paymentType': this.paymentType,
            'amountInformationRaw': this.amountInformationRaw,
            'amountInformation': this.amountInformation,
            'accountInformationRaw': this.accountInformationRaw,
            'accountInformation': this.accountInformation,
            'traceInformationRaw': this.traceInformationRaw,
            'traceInformation': this.traceInformation,
            'additionalInformationRaw': this.additionalInformationRaw
        }
    }
}

type PaxLocalTotalReportParams = {
    creditSaleCount: string;
    creditSaleAmount: string;
    creditForcedCount: string;
    creditForcedAmount: string;
    creditReturnCount: string;
    creditReturnAmount: string;
    creditAuthCount: string;
    creditAuthAmount: string;
    creditPostAuthCount: string;
    creditPostAuthAmount: string;
    debitSaleCount: string;
    debitSaleAmount: string;
    debitReturnCount: string;
    debitReturnAmount: string;
    eBTSaleCount: string;
    eBTSaleAmount: string;
    eBTReturnCount: string;
    eBTReturnAmount: string;
    eBTWithdrawalCount: string;
    eBTWithdrawalAmount: string;
    giftSaleCount: string;
    giftSaleAmount: string;
    giftAuthCount: string;
    giftAuthAmount: string;
    giftPostAuthCount: string;
    giftPostAuthAmount: string;
    giftActivateCount: string;
    giftActivateAmount: string;
    giftIssueCount: string;
    giftIssueAmount: string;
    giftReloadCount: string;
    giftReloadAmount: string;
    giftReturnCount: string;
    giftReturnAmount: string;
    giftForcedCount: string;
    giftForcedAmount: string;
    giftCashoutCount: string;
    giftCashoutAmount: string;
    giftDeactivateCount: string;
    giftDeactivateAmount: string;
    giftAdjustCount: string;
    giftAdjustAmount: string;
    loyaltyRedeemCount: string;
    loyaltyRedeemAmount: string;
    loyaltyIssueCount: string;
    loyaltyIssueAmount: string;
    loyaltyReloadCount: string;
    loyaltyReloadAmount: string;
    loyaltyReturnCount: string;
    loyaltyReturnAmount: string;
    loyaltyForcedCount: string;
    loyaltyForcedAmount: string;
    loyaltyActivateCount: string;
    loyaltyActivateAmount: string;
    loyaltyDeactivateCount: string;
    loyaltyDeactivateAmount: string;
    cashSaleCount: string;
    cashSaleAmount: string;
    cashReturnCount: string;
    cashReturnAmount: string;
    checkSaleCount: string;
    checkSaleAmount: string;
    checkAdjustCount: string;
    checkAdjustAmount: string;
}

class PaxLocalTotalReport {
    creditSaleCount: string;
    creditSaleAmount: string;
    creditForcedCount: string;
    creditForcedAmount: string;
    creditReturnCount: string;
    creditReturnAmount: string;
    creditAuthCount: string;
    creditAuthAmount: string;
    creditPostAuthCount: string;
    creditPostAuthAmount: string;
    debitSaleCount: string;
    debitSaleAmount: string;
    debitReturnCount: string;
    debitReturnAmount: string;
    eBTSaleCount: string;
    eBTSaleAmount: string;
    eBTReturnCount: string;
    eBTReturnAmount: string;
    eBTWithdrawalCount: string;
    eBTWithdrawalAmount: string;
    giftSaleCount: string;
    giftSaleAmount: string;
    giftAuthCount: string;
    giftAuthAmount: string;
    giftPostAuthCount: string;
    giftPostAuthAmount: string;
    giftActivateCount: string;
    giftActivateAmount: string;
    giftIssueCount: string;
    giftIssueAmount: string;
    giftReloadCount: string;
    giftReloadAmount: string;
    giftReturnCount: string;
    giftReturnAmount: string;
    giftForcedCount: string;
    giftForcedAmount: string;
    giftCashoutCount: string;
    giftCashoutAmount: string;
    giftDeactivateCount: string;
    giftDeactivateAmount: string;
    giftAdjustCount: string;
    giftAdjustAmount: string;
    loyaltyRedeemCount: string;
    loyaltyRedeemAmount: string;
    loyaltyIssueCount: string;
    loyaltyIssueAmount: string;
    loyaltyReloadCount: string;
    loyaltyReloadAmount: string;
    loyaltyReturnCount: string;
    loyaltyReturnAmount: string;
    loyaltyForcedCount: string;
    loyaltyForcedAmount: string;
    loyaltyActivateCount: string;
    loyaltyActivateAmount: string;
    loyaltyDeactivateCount: string;
    loyaltyDeactivateAmount: string;
    cashSaleCount: string;
    cashSaleAmount: string;
    cashReturnCount: string;
    cashReturnAmount: string;
    checkSaleCount: string;
    checkSaleAmount: string;
    checkAdjustCount: string;
    checkAdjustAmount: string;

    constructor({
                    creditSaleCount,
                    creditSaleAmount,
                    creditForcedCount,
                    creditForcedAmount,
                    creditReturnCount,
                    creditReturnAmount,
                    creditAuthCount,
                    creditAuthAmount,
                    creditPostAuthCount,
                    creditPostAuthAmount,
                    debitSaleCount,
                    debitSaleAmount,
                    debitReturnCount,
                    debitReturnAmount,
                    eBTSaleCount,
                    eBTSaleAmount,
                    eBTReturnCount,
                    eBTReturnAmount,
                    eBTWithdrawalCount,
                    eBTWithdrawalAmount,
                    giftSaleCount,
                    giftSaleAmount,
                    giftAuthCount,
                    giftAuthAmount,
                    giftPostAuthCount,
                    giftPostAuthAmount,
                    giftActivateCount,
                    giftActivateAmount,
                    giftIssueCount,
                    giftIssueAmount,
                    giftReloadCount,
                    giftReloadAmount,
                    giftReturnCount,
                    giftReturnAmount,
                    giftForcedCount,
                    giftForcedAmount,
                    giftCashoutCount,
                    giftCashoutAmount,
                    giftDeactivateCount,
                    giftDeactivateAmount,
                    giftAdjustCount,
                    giftAdjustAmount,
                    loyaltyRedeemCount,
                    loyaltyRedeemAmount,
                    loyaltyIssueCount,
                    loyaltyIssueAmount,
                    loyaltyReloadCount,
                    loyaltyReloadAmount,
                    loyaltyReturnCount,
                    loyaltyReturnAmount,
                    loyaltyForcedCount,
                    loyaltyForcedAmount,
                    loyaltyActivateCount,
                    loyaltyActivateAmount,
                    loyaltyDeactivateCount,
                    loyaltyDeactivateAmount,
                    cashSaleCount,
                    cashSaleAmount,
                    cashReturnCount,
                    cashReturnAmount,
                    checkSaleCount,
                    checkSaleAmount,
                    checkAdjustCount,
                    checkAdjustAmount,
                }: PaxLocalTotalReportParams) {
        this.creditSaleCount = creditSaleCount;
        this.creditSaleAmount = creditSaleAmount;
        this.creditForcedCount = creditForcedCount;
        this.creditForcedAmount = creditForcedAmount;
        this.creditReturnCount = creditReturnCount;
        this.creditReturnAmount = creditReturnAmount;
        this.creditAuthCount = creditAuthCount;
        this.creditAuthAmount = creditAuthAmount;
        this.creditPostAuthCount = creditPostAuthCount;
        this.creditPostAuthAmount = creditPostAuthAmount;
        this.debitSaleCount = debitSaleCount;
        this.debitSaleAmount = debitSaleAmount;
        this.debitReturnCount = debitReturnCount;
        this.debitReturnAmount = debitReturnAmount;
        this.eBTSaleCount = eBTSaleCount;
        this.eBTSaleAmount = eBTSaleAmount;
        this.eBTReturnCount = eBTReturnCount;
        this.eBTReturnAmount = eBTReturnAmount;
        this.eBTWithdrawalCount = eBTWithdrawalCount;
        this.eBTWithdrawalAmount = eBTWithdrawalAmount;
        this.giftSaleCount = giftSaleCount;
        this.giftSaleAmount = giftSaleAmount;
        this.giftAuthCount = giftAuthCount;
        this.giftAuthAmount = giftAuthAmount;
        this.giftPostAuthCount = giftPostAuthCount;
        this.giftPostAuthAmount = giftPostAuthAmount;
        this.giftActivateCount = giftActivateCount;
        this.giftActivateAmount = giftActivateAmount;
        this.giftIssueCount = giftIssueCount;
        this.giftIssueAmount = giftIssueAmount;
        this.giftReloadCount = giftReloadCount;
        this.giftReloadAmount = giftReloadAmount;
        this.giftReturnCount = giftReturnCount;
        this.giftReturnAmount = giftReturnAmount;
        this.giftForcedCount = giftForcedCount;
        this.giftForcedAmount = giftForcedAmount;
        this.giftCashoutCount = giftCashoutCount;
        this.giftCashoutAmount = giftCashoutAmount;
        this.giftDeactivateCount = giftDeactivateCount;
        this.giftDeactivateAmount = giftDeactivateAmount;
        this.giftAdjustCount = giftAdjustCount;
        this.giftAdjustAmount = giftAdjustAmount;
        this.loyaltyRedeemCount = loyaltyRedeemCount;
        this.loyaltyRedeemAmount = loyaltyRedeemAmount;
        this.loyaltyIssueCount = loyaltyIssueCount;
        this.loyaltyIssueAmount = loyaltyIssueAmount;
        this.loyaltyReloadCount = loyaltyReloadCount;
        this.loyaltyReloadAmount = loyaltyReloadAmount;
        this.loyaltyReturnCount = loyaltyReturnCount;
        this.loyaltyReturnAmount = loyaltyReturnAmount;
        this.loyaltyForcedCount = loyaltyForcedCount;
        this.loyaltyForcedAmount = loyaltyForcedAmount;
        this.loyaltyActivateCount = loyaltyActivateCount;
        this.loyaltyActivateAmount = loyaltyActivateAmount;
        this.loyaltyDeactivateCount = loyaltyDeactivateCount;
        this.loyaltyDeactivateAmount = loyaltyDeactivateAmount;
        this.cashSaleCount = cashSaleCount;
        this.cashSaleAmount = cashSaleAmount;
        this.cashReturnCount = cashReturnCount;
        this.cashReturnAmount = cashReturnAmount;
        this.checkSaleCount = checkSaleCount;
        this.checkSaleAmount = checkSaleAmount;
        this.checkAdjustCount = checkAdjustCount;
        this.checkAdjustAmount = checkAdjustAmount;
    }

    static fromList(fields: any[]) {
        return new PaxLocalTotalReport({
            creditSaleCount: fields[0],
            creditSaleAmount: fields[1],
            creditForcedCount: fields[2],
            creditForcedAmount: fields[3],
            creditReturnCount: fields[4],
            creditReturnAmount: fields[5],
            creditAuthCount: fields[6],
            creditAuthAmount: fields[7],
            creditPostAuthCount: fields[8],
            creditPostAuthAmount: fields[9],
            debitSaleCount: fields[10],
            debitSaleAmount: fields[11],
            debitReturnCount: fields[12],
            debitReturnAmount: fields[13],
            eBTSaleCount: fields[14],
            eBTSaleAmount: fields[15],
            eBTReturnCount: fields[16],
            eBTReturnAmount: fields[17],
            eBTWithdrawalCount: fields[18],
            eBTWithdrawalAmount: fields[19],
            giftSaleCount: fields[20],
            giftSaleAmount: fields[21],
            giftAuthCount: fields[22],
            giftAuthAmount: fields[23],
            giftPostAuthCount: fields[24],
            giftPostAuthAmount: fields[25],
            giftActivateCount: fields[26],
            giftActivateAmount: fields[27],
            giftIssueCount: fields[28],
            giftIssueAmount: fields[29],
            giftReloadCount: fields[30],
            giftReloadAmount: fields[31],
            giftReturnCount: fields[32],
            giftReturnAmount: fields[33],
            giftForcedCount: fields[34],
            giftForcedAmount: fields[35],
            giftCashoutCount: fields[36],
            giftCashoutAmount: fields[37],
            giftDeactivateCount: fields[38],
            giftDeactivateAmount: fields[39],
            giftAdjustCount: fields[40],
            giftAdjustAmount: fields[41],
            loyaltyRedeemCount: fields[42],
            loyaltyRedeemAmount: fields[43],
            loyaltyIssueCount: fields[44],
            loyaltyIssueAmount: fields[45],
            loyaltyReloadCount: fields[46],
            loyaltyReloadAmount: fields[47],
            loyaltyReturnCount: fields[48],
            loyaltyReturnAmount: fields[49],
            loyaltyForcedCount: fields[50],
            loyaltyForcedAmount: fields[51],
            loyaltyActivateCount: fields[52],
            loyaltyActivateAmount: fields[53],
            loyaltyDeactivateCount: fields[54],
            loyaltyDeactivateAmount: fields[55], //deactivate
            cashSaleCount: fields[56],
            cashSaleAmount: fields[57],
            cashReturnCount: fields[58],
            cashReturnAmount: fields[59],
            checkSaleCount: fields[60],
            checkSaleAmount: fields[61],
            checkAdjustCount: fields[62],
            checkAdjustAmount: fields[63],
        });
    }

    toJson() {
        return {
            creditSaleCount: this.creditSaleCount,
            creditSaleAmount: this.creditSaleAmount,
            creditForcedCount: this.creditForcedCount,
            creditForcedAmount: this.creditForcedAmount,
            creditReturnCount: this.creditReturnCount,
            creditReturnAmount: this.creditReturnAmount,
            creditAuthCount: this.creditAuthCount,
            creditAuthAmount: this.creditAuthAmount,
            creditPostAuthCount: this.creditPostAuthCount,
            creditPostAuthAmount: this.creditPostAuthAmount,
            debitSaleCount: this.debitSaleCount,
            debitSaleAmount: this.debitSaleAmount,
            debitReturnCount: this.debitReturnCount,
            debitReturnAmount: this.debitReturnAmount,
            eBTSaleCount: this.eBTSaleCount,
            eBTSaleAmount: this.eBTSaleAmount,
            eBTReturnCount: this.eBTReturnCount,
            eBTReturnAmount: this.eBTReturnAmount,
            eBTWithdrawalCount: this.eBTWithdrawalCount,
            eBTWithdrawalAmount: this.eBTWithdrawalAmount,
            giftSaleCount: this.giftSaleCount,
            giftSaleAmount: this.giftSaleAmount,
            giftAuthCount: this.giftAuthCount,
            giftAuthAmount: this.giftAuthAmount,
            giftPostAuthCount: this.giftPostAuthCount,
            giftPostAuthAmount: this.giftPostAuthAmount,
            giftActivateCount: this.giftActivateCount,
            giftActivateAmount: this.giftActivateAmount,
            giftIssueCount: this.giftIssueCount,
            giftIssueAmount: this.giftIssueAmount,
            giftReloadCount: this.giftReloadCount,
            giftReloadAmount: this.giftReloadAmount,
            giftReturnCount: this.giftReturnCount,
            giftReturnAmount: this.giftReturnAmount,
            giftForcedCount: this.giftForcedCount,
            giftForcedAmount: this.giftForcedAmount,
            giftCashoutCount: this.giftCashoutCount,
            giftCashoutAmount: this.giftCashoutAmount,
            giftDeactivateCount: this.giftDeactivateCount,
            giftDeactivateAmount: this.giftDeactivateAmount,
            giftAdjustCount: this.giftAdjustCount,
            giftAdjustAmount: this.giftAdjustAmount,
            loyaltyRedeemCount: this.loyaltyRedeemCount,
            loyaltyRedeemAmount: this.loyaltyRedeemAmount,
            loyaltyIssueCount: this.loyaltyIssueCount,
            loyaltyIssueAmount: this.loyaltyIssueAmount,
            loyaltyReloadCount: this.loyaltyReloadCount,
            loyaltyReloadAmount: this.loyaltyReloadAmount,
            loyaltyReturnCount: this.loyaltyReturnCount,
            loyaltyReturnAmount: this.loyaltyReturnAmount,
            loyaltyForcedCount: this.loyaltyForcedCount,
            loyaltyForcedAmount: this.loyaltyForcedAmount,
            loyaltyActivateCount: this.loyaltyActivateCount,
            loyaltyActivateAmount: this.loyaltyActivateAmount,
            loyaltyDeactivateCount: this.loyaltyDeactivateCount,
            loyaltyDeactivateAmount: this.loyaltyDeactivateAmount,
            cashSaleCount: this.cashSaleCount,
            cashSaleAmount: this.cashSaleAmount,
            cashReturnCount: this.cashReturnCount,
            cashReturnAmount: this.cashReturnAmount,
            checkSaleCount: this.checkSaleCount,
            checkSaleAmount: this.checkSaleAmount,
            checkAdjustCount: this.checkAdjustCount,
            checkAdjustAmount: this.checkAdjustAmount,
        }
    }
}

type PaxReportResponseParams = {
    status: string;
    command: string;
    version: string;
    responseCode: string;
    responseMessage: string;
}

export default class PaxReportResponse {
    static COMMAND_TYPE_REPORT_LOCAL_DETAIL_RESPONSE = "R03";
    static COMMAND_TYPE_REPORT_LOCAL_TOTAL_RESPONSE = "R01";

    status: string;
    command: string;
    version: string;
    responseCode: string;
    responseMessage: string;
    paxLocalTotalReport: PaxLocalTotalReport | undefined;
    paxLocalDetailReport: PaxLocalDetailReport | undefined;

    constructor({
                    status,
                    command,
                    version,
                    responseCode,
                    responseMessage,
                }: PaxReportResponseParams) {
        this.status = status;
        this.command = command;
        this.version = version;
        this.responseCode = responseCode;
        this.responseMessage = responseMessage;
    }

    static fromString(res: string) {
        const len = stringToHex(res).indexOf("03");
        const hex = stringToHex(res).slice(0, len).split(/02|1c/);
        const fields = hex.map((item: any) => {
            if (item.search("1f") > 0) {
                const subHex = item.split("1f");
                return subHex.map((subItem: any) => hexToString(subItem));
            }
            if (item.search(/3d|26/) > 0) {
                const subHex = item.split(/3d|26/);
                return subHex.map((subItem: any) => hexToString(subItem));
            }
            return hexToString(item);
        });
        console.log({rawResponse: res});
        console.log({len});
        console.log({hex});
        console.log({fields});
        if (fields.length >= 5) {
            const status = fields[1]!;
            const command = fields[2]!;
            const version = fields[3]!;
            const responseCode = fields[4]!;
            const responseMessage = fields[5]!;
            const result = new PaxReportResponse({
                status: status,
                command: command,
                version: version,
                responseCode: responseCode,
                responseMessage: responseMessage,
            })
            if (fields.length >= 7 && command === PaxReportResponse.COMMAND_TYPE_REPORT_LOCAL_TOTAL_RESPONSE) {
                result.paxLocalTotalReport = PaxLocalTotalReport.fromList(fields[7]);
            }
            if (fields.length >= 14 && command === PaxReportResponse.COMMAND_TYPE_REPORT_LOCAL_DETAIL_RESPONSE) {
                result.paxLocalDetailReport = PaxLocalDetailReport.fromList(fields);
            }
            console.log({'parseResponse': result})
            return result;
        }
        return null;
    }

    extraData() {
        if (
            this.command === PaxReportResponse.COMMAND_TYPE_REPORT_LOCAL_DETAIL_RESPONSE &&
            this.paxLocalDetailReport != null
        ) {
            return this.paxLocalDetailReport.toJson();
        }
        return null;
    }

    toJson() {
        return {
            'status': this.status,
            'command': this.command,
            'version': this.version,
            'response_code': this.responseCode,
            'response_message': this.responseMessage,
            'extra_data': this.extraData(),
        }
    }
}