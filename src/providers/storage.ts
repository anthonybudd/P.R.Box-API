import aws from 'aws-sdk';

export default new aws.S3({
    endpoint: new aws.Endpoint(process.env.AWS_S3_ENDPOINT || ''),
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
});
