const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateInvoicePDF = async (invoiceDetails) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const fileName = path.join(__dirname, 'invoices', `invoice_${invoiceDetails.invoiceNumber}.pdf`);
        
        // Ensure the invoices directory exists
        fs.mkdirSync(path.dirname(fileName), { recursive: true });

        doc.pipe(fs.createWriteStream(fileName));

        // Add your invoice content here
        
        // Header
        doc.font('Helvetica-Bold').fontSize(17).text('Invoice', { align: 'left' });
        doc.moveDown();

        // Invoice Details
        doc.fontSize(10).text(`Invoice Number: ${invoiceDetails.invoiceNumber}`, { align: 'left'});
        doc.fontSize(10).text(`Date of Issue: ${invoiceDetails.date}`, { align: 'left'});
        doc.moveDown();

        // Seller and Buyer Information
        doc.fontSize(10).text(`Shipjitt`, { align: 'left', bold: true});
        doc.fontSize(10).text(`Address: Jeton Terstena, Pristina, Kosovo`, { align: 'left'});   
        doc.fontSize(10).text(`Contact: contact@shipjitt.com`, { align: 'left'});
        doc.moveDown();

        doc.fontSize(10).text(`Invoice Number: ${invoiceDetails.invoiceNumber}`);
        doc.fontSize(10).text(`Date: ${invoiceDetails.date}`);
        doc.fontSize(10).text(`Amount: ${invoiceDetails.amount}`);
        doc.fontSize(10).text(`Status: ${invoiceDetails.status.charAt(0).toUpperCase() + invoiceDetails.status.slice(1)}`);
        doc.fontSize(10).text(`Currency: ${invoiceDetails.currency.toUpperCase()}`);
        doc.fontSize(10).text(`Payment Method: ${invoiceDetails.paymentMethod.charAt(0).toUpperCase() + invoiceDetails.paymentMethod.slice(1)}`);
        doc.fontSize(10).text(`Payment Status: ${invoiceDetails.paymentStatus.charAt(0).toUpperCase() + invoiceDetails.paymentStatus.slice(1)}`);
        doc.fontSize(10).text(`Plan Name: ${invoiceDetails.planName.charAt(0).toUpperCase() + invoiceDetails.planName.slice(1)}`);
        // doc.fontSize(10).text(`Transaction ID: ${invoiceDetails.transactionId}`);

        // Summary 
        // calculate amount with tax which is 18% in my case
        let amount = parseFloat(invoiceDetails.amount);
        let taxRate = 18;
        let taxAmount = (amount * taxRate) / 100;
        let totalAmount = amount;
        let taxableAmount = amount - taxAmount;
        
        doc.moveDown();
        doc.font('Helvetica-Bold').fontSize(10).text(`Total exluding tax: ${taxableAmount.toFixed(2)} `, { align: 'right' });
        doc.font('Helvetica-Bold').fontSize(10).text(`Tax ${taxRate}%: ${taxAmount.toFixed(2)} `, { align: 'right' });
        doc.font('Helvetica-Bold').fontSize(10).text(`Total: ${totalAmount.toFixed(2)} `, { align: 'right' });
        doc.font('Helvetica-Bold').fontSize(10).text(`Amount Due: ${totalAmount.toFixed(2)}`, { align: 'right' });


        doc.end();

        doc.on('finish', () => {
            resolve(fileName);
        });

        doc.on('error', (err) => {
            reject(err);
        });
    });
};

module.exports = { generateInvoicePDF };


