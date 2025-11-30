declare module "pdf2json" {
    import { EventEmitter } from "events";

    export default class PDFParser extends EventEmitter {
        constructor(context?: any, enableRawTextContent?: boolean);
        parseBuffer(buffer: Buffer): void;
        getRawTextContent(): string;
        on(event: string, listener: (...args: any[]) => void): this;
    }
}
