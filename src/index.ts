import logger from './utils/logger';

import ReportRequest, {ReportRequestParams} from "./models/request/report-request";
import PaxReportResponse from "./models/response/pax-report-response";
import {
    GapMiniAppSdk,
} from "gap-miniapp-sdk";
import {
    getLRC,
    stringToHex
} from "./utils";

import {
    CARD_TYPE,
    EDC_TYPE,
    TRANS_TYPE,
    REPORT_TRAN_TYPE
} from "./constants";

import TraceInfo from "./models/request/track-info";
import PaxResponse from "./models/response/pax-response";
import AmountInfo from "./models/request/amount-info";

export * from "./constants";

export type PaxRequest = {
    ip: string;
    port: number;
    miniApp: GapMiniAppSdk,
    timeout?: number;
}

export type MakeCallRequest = {
    command: string;
    args: any[];
    debug?: boolean;
}

export type BuildRequestRequest = {
    command: string;
    args: any[];
    debug?: boolean;
    encode?: boolean;
}

export type MakeCallReportRequest = {
    command: string;
    args: any[];
    debug?: boolean;
}

export type DoVoidRequest = {
    reference?: string;
    transaction: string;
}

export type DoAdjustRequest = {
    reference: string;
    transaction: string;
    amount: number;
}

export type DoSalesRequest = {
    orderID?: string;
    amount: number;
    tips: number;
}

export type DoReturnRequest = {
    orderId?: string;
    amount: number;
}

type LocalDetailReportRequest = Pick<ReportRequestParams, "edcType" | "cardType" | "ecrRefNum" | "refNum">;

type LocalTotalReportRequest = Pick<ReportRequestParams, "edcType" | "cardType">;

export default class Pax {
    static PROTO_VERSION = "1.28";
    static instance: Pax;
    ip: string | undefined;
    port: number | undefined;
    timeout: number | undefined;
    miniApp: GapMiniAppSdk | undefined;

    constructor({
                    ip,
                    port,
                    miniApp,
                    timeout = 120,
                }: PaxRequest) {
        if (!miniApp) {
            throw new Error('Please pass miniApp!')
        }
        if (Pax.instance) {
            Pax.instance.setConfig({
                ip: ip,
                port: port,
                miniApp: miniApp,
                timeout: timeout
            });
            return Pax.instance;
        }
        this.ip = ip;
        this.port = port;
        this.miniApp = miniApp;
        this.timeout = timeout;
        Pax.instance = this;
    }

    setConfig({ip, port, miniApp, timeout}: PaxRequest) {
        this.ip = ip;
        this.port = port;
        this.miniApp = miniApp;
        this.timeout = timeout;
    }

    buildRequest({
                     command,
                     args,
                     // @ts-ignore
                     debug = false,
                     encode = true
                 }: BuildRequestRequest) {
        const argsStr = args.map((arg: any) => {
            return Array.isArray(arg) ? arg.join(String.fromCharCode(31)) : arg
        }).join(String.fromCharCode(28));

        let cmd: string =
            String.fromCharCode(2) +
            command +
            String.fromCharCode(28) +
            Pax.PROTO_VERSION +
            String.fromCharCode(28) +
            argsStr +
            String.fromCharCode(3);
        cmd = cmd + getLRC(cmd);

        if (!encode) return cmd;
        return btoa(cmd);
    }

    parseResponse(response: string): PaxResponse | null {
        const checkParams = stringToHex(response).split(" ").pop();
        const redundancyCheck = stringToHex(response).split(" ").pop()?.substring(1);
        const lrcFromResponse = getLRC(checkParams!);
        if (lrcFromResponse !== redundancyCheck) {
            throw new Error(`LRC Mismatch! Got ${lrcFromResponse} but expected ${redundancyCheck}`);
        }
        return PaxResponse.fromString(response);
    }

    parseReportResponse(response: string): PaxReportResponse | null {
        const checkParams = stringToHex(response).split(" ").pop();
        const redundancyCheck = stringToHex(response).split(" ").pop()?.substring(1);
        const lrcFromResponse = getLRC(checkParams!);
        if (lrcFromResponse !== redundancyCheck) {
            throw new Error(`LRC Mismatch! Got ${lrcFromResponse} but expected ${redundancyCheck}`);
        }
        return PaxReportResponse.fromString(response);
    }

    async httpRequest(query: string) {
        const baseUrl = "http://" + this.ip + ":" + this.port?.toString();
        const processUrl = "/?" + query;
        const url = baseUrl + processUrl;
        return await this.miniApp!.gapHttpRequest({
            method: "GET",
            url: url,
            data: null,
            timeout: this.timeout
        }) as string;
    }

    makeCall({command, args, debug = false}: MakeCallRequest): Promise<PaxResponse | null> {
        return new Promise(async resolve => {
            try {
                const query = this.buildRequest({
                    command: command,
                    args: args,
                    debug: debug
                });
                logger.info(`PAX REQUEST Query: [${this.ip}:${this.port}?${query}] - Command: [${command}] - DATA: [${args}]`);

                const result = await this.httpRequest(query).catch((error: any) => {
                    throw new Error(`PAX REQUEST fail Query: [${this.ip}:${this.port}?${query}] Error: ${error.message}`);
                });
                if (!result) {
                    throw new Error(`PAX REQUEST fail Query: [${this.ip}:${this.port}?${query}] Error: 'Result null!'`);
                }
                logger.success(`PAX REQUEST Query: [${this.ip}:${this.port}?${query}] - RESPONSE: [${JSON.stringify(result)}]`);
                const paxResponse = this.parseResponse(result);
                logger.success(`PAX REQUEST Query: [${this.ip}:${this.port}?${query}] - RESPONSE: [${JSON.stringify(paxResponse)}]`);
                return resolve(paxResponse);
            } catch (error: any) {
                logger.error(error.message);
                console.error(error)
                return resolve(null);
            }
        })
    }

    makeCallReport({command, args, debug}: MakeCallReportRequest): Promise<PaxReportResponse | null> {
        return new Promise(async resolve => {
            try {
                const query = this.buildRequest({command: command, args: args, debug: debug});
                logger.info(`PAX REQUEST Query: [${this.ip}:${this.port}?${query}] - Command: [${command}] - DATA: [${args}]`);
                const result = await this.httpRequest(query).catch((error: any) => {
                    throw new Error(`PAX REQUEST fail Query: [${this.ip}:${this.port}?${query}] Error: ${error.message}`);
                });
                if (!result) {
                    throw new Error(`PAX REQUEST fail Query: [${this.ip}:${this.port}?${query}] Error: 'Result null!'`);
                }
                logger.success(`PAX REQUEST Query: [${this.ip}:${this.port}?${query}] - RESPONSE: [${JSON.stringify(result)}]`);
                const paxReportResponse = this.parseReportResponse(result);
                logger.success(`PAX REQUEST Query: [${this.ip}:${this.port}?${query}] - RESPONSE: [${JSON.stringify(paxReportResponse)}]`);
                return resolve(paxReportResponse);
            } catch (error: any) {
                logger.error(error.message);
                console.error(error);
                return resolve(null);
            }
        })
    }

    async doInitialize(): Promise<PaxResponse | null> {
        return this.makeCall({
            command: "A00",
            args: []
        });
    }

    async doMenu(): Promise<boolean> {
        return new Promise(async resolve => {
            const args = [TRANS_TYPE.MENU, '', '', '1', '', '', '', '', ''];
            const response = await this.makeCall({
                command: "T00",
                args: args
            });
            if (response !== null) {
                if (
                    response.responseCode === "000000" &&
                    response.responseMessage === "OK"
                ) {
                    return resolve(true);
                }
            }
            return resolve(false);
        })
    }

    async doSales({orderID, amount, tips}: DoSalesRequest): Promise<PaxResponse | null> {
        logger.info(`PAX REQUEST : [do_sales] - Order_ID: [${orderID}] - DATA: [Amount: ${amount} - tips: ${tips}]`);
        const amountRequest = new AmountInfo({
            transactionAmount: amount.toString(),
            tipAmount: (tips === 0 || tips === null || isNaN(tips)) ? '0' : tips.toString(),
        });
        const traceRequest = new TraceInfo({
            referenceNumber: orderID,
            invoiceNumber: orderID,
        });
        const args = [
            TRANS_TYPE.SALE,
            amountRequest.toListData(),
            '',
            traceRequest.toListData(),
            '',
            '',
            '',
            '',
            ''
        ];
        return this.makeCall({
            command: "T00",
            args: args
        });
    }

    async doAdjust({reference, transaction, amount}: DoAdjustRequest): Promise<PaxResponse | null> {
        logger.info(`PAX REQUEST : [do_adjust] - Order_ID: [${reference}] - DATA: [tran_id: ${transaction} - tips: ${amount}]`);
        const amountRequest = new AmountInfo({
            transactionAmount: Math.round(amount * 100).toString()
        });
        const traceRequest = new TraceInfo({
            transactionNumber: transaction,
            referenceNumber: reference
        });
        const args = [
            TRANS_TYPE.ADJUST,
            amountRequest.toListData(),
            '',
            traceRequest.toListData(),
            '',
            '',
            '',
            '',
            ''
        ];
        return this.makeCall({
            command: "T00",
            args: args
        });
    }

    async doReturn({orderId, amount}: DoReturnRequest): Promise<PaxResponse | null> {
        logger.info(`PAX REQUEST : [do_return] - DATA: [amount: ${amount}]`);
        const amountRequest = new AmountInfo({
            transactionAmount: amount.toString(),
        });
        const traceRequest = new TraceInfo({
            referenceNumber: orderId
        });
        const args = [
            TRANS_TYPE.RETURN,
            amountRequest.toListData(),
            '',
            traceRequest.toListData(),
            '',
            '',
            '',
            '',
            ''
        ];
        return this.makeCall({
            command: "T00",
            args: args
        });
    }

    async doVoid({reference, transaction}: DoVoidRequest): Promise<PaxResponse | null> {
        logger.info(`PAX REQUEST : [do_void] - Order_id: ${reference} DATA: [Tran_id: ${transaction}]`);
        const traceRequest = new TraceInfo({
            transactionNumber: transaction,
            referenceNumber: reference
        });
        const args = [
            TRANS_TYPE.VOID,
            '',
            '',
            traceRequest.toListData(),
            '',
            '',
            '',
            '',
            '',
        ];

        return this.makeCall({
            command: 'T00',
            args: args
        });
    }

    async doBatchClose(): Promise<PaxResponse | null> {
        return this.makeCall({
            command: 'B00',
            args: [],
        });
    }

    async localDetailReport({
                                edcType = EDC_TYPE.ALL,
                                cardType = CARD_TYPE.ALL,
                                ecrRefNum = '',
                                refNum = ''
                            }: LocalDetailReportRequest = {}): Promise<PaxReportResponse | null> {
        const reportRequest = new ReportRequest({
            edcType: edcType,
            cardType: cardType,
            ecrRefNum: ecrRefNum,
            refNum: refNum,
        });
        return this.makeCallReport({
            command: REPORT_TRAN_TYPE.LOCALDETAILREPORT,
            args: reportRequest.toListData()
        });
    }

    async localTotalReport({
                               edcType = EDC_TYPE.ALL,
                           }: LocalTotalReportRequest = {}): Promise<PaxReportResponse | null> {
        const reportRequest = new ReportRequest({
            edcType: edcType,
        });
        return this.makeCallReport({
            command: REPORT_TRAN_TYPE.LOCALTOTALREPORT,
            args: reportRequest.toListData()
        });
    }
}

(window as any).Pax = Pax;