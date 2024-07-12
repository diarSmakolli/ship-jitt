// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const path = require('path');

// const generateInvoicePDF = (invoice) => {
//     return new Promise((resolve, reject) => {
//         const doc = new PDFDocument();
//         const filePath = path.join(__dirname, `./invoices/${invoice.invoiceNumber}.pdf`);

//         doc.pipe(fs.createWriteStream(filePath));

//         doc.fontSize(20).text(`Invoice`, { align: 'center' });
//         doc.moveDown();
//         doc.fontSize(14).text(`Invoice Number: ${invoice.invoiceNumber}`);
//         doc.text(`Date: ${invoice.date}`);
//         doc.text(`Amount: ${invoice.amount} ${invoice.currency}`);
//         doc.text(`Status: ${invoice.status}`);
//         doc.text(`Payment Method: ${invoice.paymentMethod}`);
//         doc.text(`Payment Status: ${invoice.paymentStatus}`);
//         doc.text(`Plan: ${invoice.planName}`);
//         doc.text(`Transaction ID: ${invoice.transactionId}`);
//         doc.text(`Created At: ${invoice.createdAt}`);

//         doc.end();

//         doc.on('finish', () => {
//             resolve(filePath);
//         });

//         doc.on('error', (err) => {
//             reject(err);
//         });
//     });
// };

// module.exports = { generateInvoicePDF };



// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const path = require('path');

// const generateInvoicePDF = (invoice) => {
//     return new Promise((resolve, reject) => {
//         const doc = new PDFDocument();
//         const invoicesDir = path.join(__dirname, './invoices');

//         // Ensure the invoices directory exists
//         if (!fs.existsSync(invoicesDir)) {
//             fs.mkdirSync(invoicesDir, { recursive: true });
//         }

//         const filePath = path.join(invoicesDir, `${invoice.invoiceNumber}.pdf`);

//         doc.pipe(fs.createWriteStream(filePath));

//         doc.fontSize(20).text(`Invoice`, { align: 'center' });
//         doc.moveDown();
//         doc.fontSize(14).text(`Invoice Number: ${invoice.invoiceNumber}`);
//         doc.text(`Date: ${invoice.date}`);
//         doc.text(`Amount: ${invoice.amount} ${invoice.currency}`);
//         doc.text(`Status: ${invoice.status}`);
//         doc.text(`Payment Method: ${invoice.paymentMethod}`);
//         doc.text(`Payment Status: ${invoice.paymentStatus}`);
//         doc.text(`Plan: ${invoice.planName}`);
//         doc.text(`Transaction ID: ${invoice.transactionId}`);
//         doc.text(`Created At: ${invoice.createdAt}`);

//         doc.end();

//         doc.on('finish', () => {
//             resolve(filePath);
//         });

//         doc.on('error', (err) => {
//             reject(err);
//         });
//     });
// };

// module.exports = { generateInvoicePDF };


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
        doc.fontSize(20).text('Invoice', { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text(`Invoice Number: ${invoiceDetails.invoiceNumber}`);
        doc.text(`Date: ${invoiceDetails.date}`);
        doc.text(`Amount: ${invoiceDetails.amount}`);
        doc.text(`Status: ${invoiceDetails.status}`);
        doc.text(`Currency: ${invoiceDetails.currency}`);
        doc.text(`Payment Method: ${invoiceDetails.paymentMethod}`);
        doc.text(`Payment Status: ${invoiceDetails.paymentStatus}`);
        doc.text(`Plan Name: ${invoiceDetails.planName}`);
        doc.text(`Transaction ID: ${invoiceDetails.transactionId}`);

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


