const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateInvoicePDF = async (invoiceDetails) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const fileName = path.join(__dirname, 'invoices', `invoice_${invoiceDetails.invoiceNumber}.pdf`);

        fs.mkdirSync(path.dirname(fileName), { recursive: true });

        doc.pipe(fs.createWriteStream(fileName));

        // Company Data
        doc.fontSize(15).text('ShipJitt INC.', { align: 'left', continued: true })
            .text(`Invoice: #${invoiceDetails.invoiceNumber}`, { align: 'right' })
        doc.fontSize(10).text('Address: Pristina 10000, Kosovo', { align: 'left', continued: true })
            .text(`Date: ${invoiceDetails.date}`, { align: 'right' })
        doc.text('Mob: +38349939001', { align: 'left' })
        doc.text('contact@shipjitt.com', { align: 'left' })
        doc.text('www.shipjitt.com', { align: 'left' })
        doc.moveDown();


        // Seller and Buyer Information
        doc.fontSize(10).text(`${invoiceDetails.customerName}`, { align: 'left', bold: true });
        doc.fontSize(10).text(`${invoiceDetails.email}`, { align: 'left' });
        doc.fontSize(10).text(`Status: ${invoiceDetails.paymentStatus.charAt(0).toUpperCase() + invoiceDetails.paymentStatus.slice(1)}`, { align: 'left' });
        doc.fontSize(10).text(`Payment method: ${invoiceDetails.paymentMethod.charAt(0).toUpperCase() + invoiceDetails.paymentMethod.slice(1)}`, { align: 'left' });
        doc.fontSize(10).text(`Package name: ${invoiceDetails.planName}`, { align: 'left' });
        doc.fontSize(10).text(`Package ID: ${invoiceDetails.priceId}`, { align: 'left' });
        doc.fontSize(10).text(`Country: ${invoiceDetails.country}`, { align: 'left' });
        doc.moveDown();


        if (invoiceDetails.paymentStatus === 'paid' || invoiceDetails.status == 'completed') {
            doc.fontSize(15).text(`$${invoiceDetails.amount} paid on ${invoiceDetails.date}`, { align: 'left' });
            doc.moveDown();
        } else {
            const dueDate = new Date(invoiceDetails.date);
            dueDate.setDate(dueDate.getDate() + 4);
            doc.fontSize(15).text(`$${invoiceDetails.amount} pending due to ${dueDate.toLocaleDateString('en-US')}`, { align: 'left' });
            doc.moveDown();
        }

        const dateObject = new Date(invoiceDetails.date);

        const formattedDate = dateObject.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        });


        doc.fontSize(9)
            .font('Helvetica')
            .fillColor('#000000')
            .text('Nr.', 70, 280)
            .text('Date', 100, 280)
            .text('Description', 150, 280)
            .text('Amount', 370, 280)
            .text('Vat/Tax rate', 440, 280);

        let y = 300;
        doc.font('Helvetica')
            .fontSize(9)
            .fillColor('#555555')
            .text(`${invoiceDetails.userId}`, 70, y)
            .text(`${formattedDate}`, 100, y)
            .text(`${invoiceDetails.planName} on Ship Jitt`, 150, y)
            .text(`${invoiceDetails.amount}`, 370, y)
            .text(`18%`, 440, y);
        y += 20;
        doc.moveDown();



        const taxRate = 18;
        const taxAmount = (invoiceDetails.amount * taxRate) / 100;
        const totalPayable = invoiceDetails.amount;
        const nettoAmount = totalPayable - taxAmount;

        const yPosition = 350;
        doc.fontSize(9).text(`Subtotal`, 400, yPosition);
        doc.fontSize(9).text(`$${nettoAmount.toFixed(2)}`, 500, yPosition);
        doc.fontSize(9).text(`VAT/TAX`, 400, yPosition + 20);
        doc.fontSize(9).text(`$${taxAmount.toFixed(2)}`, 500, yPosition + 20);
        doc.fontSize(9).text(`Total`, 400, yPosition + 40);
        doc.fontSize(9).text(`$${totalPayable}`, 500, yPosition + 40);
        doc.moveDown();


        let transferYPos = 600;

        if (invoiceDetails.paymentStatus == 'fail') {
            doc.fontSize(9).text('Pay with Bank Transfer', 70, transferYPos)
            doc.text('Account number: PCB 111958215712391', 70, transferYPos + 20)
            doc.text('Account name: ShipJitt INC.', 70, transferYPos + 40)
            doc.text('Account number: RBKO 111958215712391', 70, transferYPos + 60)
            doc.text('Account name: ShipJitt INC.', 70, transferYPos + 80)
            doc.text(`For Bank Transfer, please write number of invoice: ${invoiceDetails.invoiceNumber}`, 70, transferYPos + 100)
            doc.moveDown(2);
        }


        doc.end();

        doc.on('finish', () => {
            resolve(fileName);
        });

        doc.on('error', (err) => {
            reject(err);
        });
    });
};

// const generatePendingInvoicePDF = async (invoiceDetails) => {
//     return new Promise((resolve, reject) => {
//         const doc = new PDFDocument();
//         const fileName = path.join(__dirname, 'invoices', `invoice_${invoiceDetails.invoiceNumber}.pdf`);

//         fs.mkdirSync(path.dirname(fileName), { recursive: true });

//         doc.pipe(fs.createWriteStream(fileName));

//         // Company Data
//         doc.fontSize(15).text('ShipJitt INC.', { align: 'left', continued: true })
//             .text(`Invoice: #${invoiceDetails.invoiceNumber}`, { align: 'right' })
//         doc.fontSize(10).text('Address: Pristina 10000, Kosovo', { align: 'left', continued: true })
//             .text(`Date: ${invoiceDetails.date}`, { align: 'right' })
//         doc.text('Mob: +38349939001', { align: 'left' })
//         doc.text('contact@shipjitt.com', { align: 'left' })
//         doc.text('www.shipjitt.com', { align: 'left' })
//         doc.moveDown();


//         // Seller and Buyer Information
//         doc.fontSize(10).text(`${invoiceDetails.customerName}`, { align: 'left', bold: true });
//         doc.fontSize(10).text(`${invoiceDetails.email}`, { align: 'left' });
//         doc.fontSize(10).text(`Status: ${invoiceDetails.paymentStatus}`, { align: 'left' });
//         doc.fontSize(10).text(`Payment method: ${invoiceDetails.paymentMethod}`, { align: 'left' });
//         doc.fontSize(10).text(`Transaction ID: ${invoiceDetails.transactionId}`, { align: 'left' });
//         doc.fontSize(10).text(`Active Plan: ${invoiceDetails.planName}`, { align: 'left' });
//         doc.fontSize(10).text(`Package ID: ${invoiceDetails.priceId}`, { align: 'left' });
//         doc.fontSize(10).text(`Country: ${invoiceDetails.country}`, { align: 'left' });
//         doc.moveDown();

//         if (invoiceDetails.paymentStatus === 'paid' || invoiceDetails.status == 'completed') {
//             doc.fontSize(15).text(`$${invoiceDetails.amount} paid on ${invoiceDetails.date}`, { align: 'left' });
//             doc.moveDown();
//         } else {
//             const dueDate = new Date(invoiceDetails.date);
//             dueDate.setDate(dueDate.getDate() + 4);
//             doc.fontSize(15).text(`$${invoiceDetails.amount} pending due to ${dueDate.toLocaleDateString('en-US')}`, { align: 'left' });
//             doc.moveDown();
//         }

//         const dateObject = new Date(invoiceDetails.date);

//         const formattedDate = dateObject.toLocaleDateString('en-US', {
//             day: 'numeric',
//             month: 'numeric',
//             year: 'numeric'
//         });


//         doc.fontSize(9)
//             .font('Helvetica')
//             .fillColor('#000000')
//             .text('Nr.', 70, 280)
//             .text('Date', 100, 280)
//             .text('Description', 150, 280)
//             .text('Amount', 370, 280)
//             .text('Vat/Tax rate', 440, 280);

//         let y = 300;
//         doc.font('Helvetica')
//             .fontSize(9)
//             .fillColor('#555555')
//             .text(`${invoiceDetails.userId}`, 70, y)
//             .text(`${formattedDate}`, 100, y)
//             .text(`${invoiceDetails.planName} on Shipjitt platform`, 150, y)
//             .text(`${invoiceDetails.amount}`, 370, y)
//             .text(`18%`, 440, y);
//         y += 20;
//         doc.moveDown();



//         const taxRate = 18;
//         const taxAmount = (invoiceDetails.amount * taxRate) / 100;
//         const totalPayable = invoiceDetails.amount;
//         const nettoAmount = totalPayable - taxAmount;

//         const yPosition = 350;
//         doc.fontSize(9).text(`Subtotal`, 400, yPosition);
//         doc.fontSize(9).text(`$${nettoAmount.toFixed(2)}`, 500, yPosition);
//         doc.fontSize(9).text(`VAT/TAX`, 400, yPosition + 20);
//         doc.fontSize(9).text(`$${taxAmount.toFixed(2)}`, 500, yPosition + 20);
//         doc.fontSize(9).text(`Total`, 400, yPosition + 40);
//         doc.fontSize(9).text(`$${totalPayable}`, 500, yPosition + 40);
//         doc.moveDown();


//         let transferYPos = 600;

//         doc.fontSize(9).text('Pay with Bank Transfer', 70, transferYPos)
//         doc.text('Account number: PCB 111958215712391', 70, transferYPos + 20)
//         doc.text('Account name: ShipJitt INC.', 70, transferYPos + 40)
//         doc.text('Account number: RBKO 111958215712391',70, transferYPos + 60)
//         doc.text('Account name: ShipJitt INC.', 70, transferYPos + 80)
//         doc.text(`For Bank Transfer, please write number of invoice: ${invoiceDetails.invoiceNumber}`, 70, transferYPos + 100)
//         doc.moveDown(2);


//         doc.end();

//         doc.on('finish', () => {
//             resolve(fileName);
//         });

//         doc.on('error', (err) => {
//             reject(err);
//         });
//     });
// };

module.exports = { generateInvoicePDF };

