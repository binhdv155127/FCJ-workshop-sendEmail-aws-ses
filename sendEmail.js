const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const sesClient = new SESClient({
  region: 'ap-southeast-1', // Bạn có thể thay đổi vùng theo nhu cầu
  credentials: {
    accessKeyId: 'YOUR_ACCESS_KEY_ID',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
  },
});

const sendEmail = async () => {
  const params = {
    Destination: {
      ToAddresses: ['recipient@example.com'], // Địa chỉ email người nhận
    },
    Message: {
      Body: {
        Html: { Data: `
        <h1>Chào mừng bạn đến với FCJ</h1>
        <p>đây là workshop đầu tiên về AWS, có thể còn nhiều thiếu sót nhưng mình tin rằng chăm chỉ sẽ tạo nên kì tích</p>
        <br />
        <p> hy vong mọi người sẽ đóng góp ý kiến để mình phát triển hơn nhé
        ` },
      },
      Subject: { Data: 'FCJ - Work shop 1 send email with ses aws' },
    },
    Source: 'sender@example.com', // Địa chỉ email người gửi
  };

  try {
    const command = new SendEmailCommand(params);
    const data = await sesClient.send(command);
    console.log('Email sent:', data);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

sendEmail();
