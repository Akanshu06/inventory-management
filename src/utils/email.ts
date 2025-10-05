import nodemailer from 'nodemailer';

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: `"Inventory Management" <${process.env.SMTP_USER}>`,
        to: Array.isArray(options.to) ? options.to.join(',') : options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      });
      
      console.log('✅ Email sent successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      return false;
    }
  }

  async sendLowStockAlert(
    to: string | string[],
    product: { name: string; sku: string; currentStock: number; threshold: number },
    location: string
  ): Promise<boolean> {
    const subject = `Low Stock Alert - ${product.name}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff6b35;">Low Stock Alert</h2>
        <p>The following product is running low on stock:</p>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0;">Product Details</h3>
          <p><strong>Name:</strong> ${product.name}</p>
          <p><strong>SKU:</strong> ${product.sku}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Current Stock:</strong> ${product.currentStock}</p>
          <p><strong>Low Stock Threshold:</strong> ${product.threshold}</p>
        </div>
        
        <p>Please consider restocking this product soon.</p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          This is an automated message from the Inventory Management System.
        </p>
      </div>
    `;

    return this.sendEmail({ to, subject, html });
  }
}

export const emailService = new EmailService();