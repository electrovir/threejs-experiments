import {html as litHtml, HTMLTemplateResult} from 'lit';

export function virHtml(strings: TemplateStringsArray, ...values: unknown[]): HTMLTemplateResult {
    const litTemplate = litHtml(strings, values);
    return litTemplate;
}
