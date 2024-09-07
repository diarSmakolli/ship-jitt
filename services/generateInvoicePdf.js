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
        doc.fontSize(10).text(`${invoiceDetails.customerName}`, { align: 'left', bold: true});
        doc.fontSize(10).text(`${invoiceDetails.email}`, { align: 'left'});   
        doc.fontSize(10).text(`TransactionId: ${invoiceDetails.payment}`, { align: 'left'});
        doc.fontSize(10).text(`Status: ${invoiceDetails.paymentStatus}`, { align: 'left'});
        doc.fontSize(10).text(`Payment method: ${invoiceDetails.paymentMethod}`, { align: 'left'});
        doc.fontSize(10).text(`Transaction ID: ${invoiceDetails.transactionId}`, { align: 'left'});
        doc.fontSize(10).text(`Active Plan: ${invoiceDetails.planName}`, { align: 'left'});
        doc.moveDown();

        if(invoiceDetails.paymentStatus === 'paid') {
            doc.fontSize(15).text(`$${invoiceDetails.amount} paid on ${invoiceDetails.date}`, { align: 'left' });
            doc.moveDown();
        } else {
            doc.fontSize(15).text(`Pending payment`, { align: 'left' });
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
           .text('Nr.', 50, 280) 
           .text('Date', 80, 280) 
           .text('Description', 150, 280) 
           .text('Amount', 370, 280) 
           .text('Vat/Tax rate', 440, 280); 
        
        let y = 300; 
        doc.font('Helvetica')
           .fontSize(9)
           .fillColor('#555555') 
           .text(`${invoiceDetails.userId}`, 50, y)
           .text(`${formattedDate}`, 80, y)
           .text(`${invoiceDetails.planName} on Shipjitt platform`, 150, y)
           .text(`${invoiceDetails.amount}`, 370, y)
           .text(`18%`, 440, y);
        y += 20; 
        doc.moveDown();
        

        // Footer
        doc.moveDown();

        const taxRate = 18;
        const taxAmount = (invoiceDetails.amount * taxRate) / 100;
        const totalPayable = invoiceDetails.amount;
        const nettoAmount = totalPayable - taxAmount;

        // doc.fontSize(10).text(`Subtotal: ${nettoAmount.toFixed(2)} `, { align: 'right' });
        // doc.fontSize(10).text(`VAT/TAX: ${taxAmount.toFixed(2)} `, { align: 'right' });
        // doc.fontSize(10).text(`Total: ${totalPayable} `, { align: 'right' });

        const yPosition = 350;
        doc.fontSize(9).text(`Subtotal`, 400, yPosition);
        doc.fontSize(9).text(`$${nettoAmount.toFixed(2)}`, 500, yPosition);
        doc.fontSize(9).text(`VAT/TAX`, 400, yPosition + 20);
        doc.fontSize(9).text(`$${taxAmount.toFixed(2)}`, 500, yPosition + 20);
        doc.fontSize(9).text(`Total`, 400, yPosition + 40);
        doc.fontSize(9).text(`$${totalPayable}`, 500, yPosition + 40);



        // Summary 
        let amount = parseFloat(invoiceDetails.amount);
        let totalAmount = amount;

        doc.moveDown();
        // doc.font('Helvetica-Bold').fontSize(10).text(`Total: ${totalAmount.toFixed(2)} `, { align: 'right' });

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


// v2.0

/*
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const request = require('request');
const fs = require('fs');

const generateInvoicePDF = async (invoiceDetails) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const fileName = path.join(__dirname, 'invoices', `invoice_${invoiceDetails.invoiceNumber}.pdf`);

        fs.mkdirSync(path.dirname(fileName), { recursive: true });

        doc.pipe(fs.createWriteStream(fileName));

        // Title
        doc.font('Helvetica').fontSize(25).text('Shipjitt INC.', { align: 'left' }, { continued: true })
        doc.text(`Invoice: ${invoiceDetails.invoiceNumber}`, { align: 'right' });
        doc.text(`Date: ${invoiceDetails.date}`, { align: 'right' });
        doc.font('Helvetica').fontSize(15).text('Address: Pristina, Kosovo 10000', { align: 'left' });
        doc.font('Helvetica').fontSize(15).text('Mob: +383 49 939 001', { align: 'left' });
        doc.font('Helvetica').fontSize(15).text('contact@shipjitt.com', { align: 'left' });
        doc.font('Helvetica').fontSize(15).text('www.shipjitt.com', { align: 'left' });
        doc.moveDown(2);

        // Client information
        doc.font('Helvetica').fontSize(10);
        doc.text(`FOR`, { align: 'left' });
        doc.text(`Studio Moderna LL.C`, { align: 'left' });
        doc.text(`Rr. Ukshin Hoti, nr.120, Objekti C3 / Hyrja 3B`, { align: 'left' });
        doc.text(`10000 Prishtina, Kosovo`, { align: 'left' });
        doc.moveDown(0.5);

        doc.font('Helvetica-Bold')
            .fontSize(10)
            .text('NR.', 20, 100)
            .text('DATA', 70, 100)
            .text('PËRSHKRIMI', 120, 100)
            .text('SASIA', 400, 100)
            .text('ÇMIMI', 450, 100)
            .text('SHUMA', 500, 100)
            .text('TVSH', 550, 100);

        // Draw a single row of sample data
        doc.font('Helvetica')
            .fontSize(10)
            .text('1', 20, 120)
            .text('02/09/2024', 70, 120)
            .text('173570 Celular myPhone 2220, i zi Porosia me numer 425539', 120, 120, { width: 270, align: 'left' })
            .text('1', 400, 120)
            .text('23.5', 450, 120)
            .text('23.50', 500, 120)
            .text('TVSH 18%', 550, 120);

        // Invoice Details
        // doc.font('Poppins').fontSize(10);
        // doc.text(`Invoice number: ${invoiceDetails.invoiceNumber}`, { continued: true })
        // .text(`Receipt number: ${invoiceDetails.invoiceNumber}`, { align: 'right' });
        // doc.text(`Date paid: ${invoiceDetails.date}`, { continued: true })
        // .text(`Payment method: ${invoiceDetails.paymentMethod}`, { align: 'right' });
        // doc.moveDown(0.5);

        // // Company Details
        // doc.text(`Togethere`);
        // doc.text(`+1 971-279-8854`);
        // doc.text(`support@togethere.work`);
        // doc.moveDown(0.5);

        // // Billing and Shipping
        // doc.text(`Bill to:`, { continued: true }).text(`Ship to:`, { align: 'right' });
        // doc.text(`${invoiceDetails.date}`, { continued: true }).text(`${invoiceDetails.date}`, { align: 'right' });
        // doc.text(`${invoiceDetails.date}`, { continued: true }).text(`${invoiceDetails.date}`, { align: 'right' });
        // doc.moveDown(2);

        // // Description Section
        // doc.text(`Description: ${invoiceDetails.planName}`);
        // doc.text(`Quantity: 1`, { continued: true }).text(`Unit price: $${invoiceDetails.amount}`, { align: 'right' });
        // doc.text(`Amount: $${invoiceDetails.amount}`);
        // doc.moveDown(1);

        // // Summary
        // doc.text(`Subtotal: $${invoiceDetails.amount}`, { align: 'right' });
        // doc.text(`Total: $${invoiceDetails.amount}`, { align: 'right' });
        // doc.text(`Amount paid: $${invoiceDetails.amount}`, { align: 'right' });

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
*/