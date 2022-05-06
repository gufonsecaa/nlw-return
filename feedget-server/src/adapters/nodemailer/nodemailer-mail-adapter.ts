import nodemailer from "nodemailer";

import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "1c30390d1d6543",
    pass: "0e6a5fc3dc0dfc"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData): Promise<void> {
    await transport.sendMail({
      from: "Equipe Feedget<oi@feedget.com>",
      to: "Deigo Fernandes <gu.fonsecaa@gmail.com>",
      subject,
      html: body
    });
  }
}
