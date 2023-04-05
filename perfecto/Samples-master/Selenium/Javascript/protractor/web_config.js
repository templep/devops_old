let perfectoReporting = require('perfecto-reporting');
var reportingClient;

exports.config = {
    //  1. Replace <<cloud name>> with your perfecto cloud name (e.g. demo is the cloudName of demo.perfectomobile.com).
    seleniumAddress: 'https://trial.perfectomobile.com/nexperience/perfectomobile/wd/hub/',
    specs: ['sample.js'],
    multiCapabilities: [{
        // 2. Replace <<security token>> with your perfecto security token.
        securityToken: 'eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2ZDM2NmJiNS01NDAyLTQ4MmMtYTVhOC1kODZhODk4MDYyZjIifQ.eyJpYXQiOjE2NzYzODY3ODAsImp0aSI6IjgwYWY4ZTU4LTZlMTctNGEwMy1iMGRkLTNmMGUxYjE3YTBmZiIsImlzcyI6Imh0dHBzOi8vYXV0aDMucGVyZmVjdG9tb2JpbGUuY29tL2F1dGgvcmVhbG1zL3RyaWFsLXBlcmZlY3RvbW9iaWxlLWNvbSIsImF1ZCI6Imh0dHBzOi8vYXV0aDMucGVyZmVjdG9tb2JpbGUuY29tL2F1dGgvcmVhbG1zL3RyaWFsLXBlcmZlY3RvbW9iaWxlLWNvbSIsInN1YiI6IjkwOWIyY2ZjLWM0ZDItNGRlNy04Y2VlLTBlNDc3NDUxNDk2ZCIsInR5cCI6Ik9mZmxpbmUiLCJhenAiOiJvZmZsaW5lLXRva2VuLWdlbmVyYXRvciIsIm5vbmNlIjoiODBmODgyMjMtODFhYi00MTBmLTg3NDMtNDE3MzBjODY4NWVjIiwic2Vzc2lvbl9zdGF0ZSI6IjViYzhmNzJhLWQwODQtNGI5ZC05MmJlLWQ0NDZkOWI1ZTE2YyIsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXNzIHByb2ZpbGUgZW1haWwifQ.M_MgxMiHs29VeuVyv3t35lDk4ue5nbwan3mljBsu_O4',

        // 3. Set web capabilities. More info: https://developers.perfectomobile.com/display/PD/Select+a+device+for+manual+testing#Selectadeviceformanualtesting-genCapGeneratecapabilities
        platformName: 'Windows',
        platformVersion: '11',
        browserName: 'Chrome',
        browserVersion: '110',
        location: 'US East',
        resolution: '1024x768',
        'goog:chromeOptions': {
            w3c: false
        }

    }],
    //default page loading timeout in ms
    getPageTimeout: 10000,

    //set perfecto reporter
    onPrepare: async() => {
        browser.ignoreSynchronization = true;
        var perfectoExecutionContext;
        if (process.env.jobName != null) {
            perfectoExecutionContext = new perfectoReporting.Perfecto.PerfectoExecutionContext({
                webdriver: browser.driver,
                job: new perfectoReporting.Model.Job({
                    jobName: process.env.jobName,
                    buildNumber: parseInt(process.env.jobNumber)
                }),
                tags: ['jasmine', 'protractor']
            });
        } else {
            perfectoExecutionContext = new perfectoReporting.Perfecto.PerfectoExecutionContext({
                webdriver: browser.driver,
                tags: ['jasmine', 'protractor']
            });
        }
        reportingClient = await new perfectoReporting.Perfecto.PerfectoReportingClient(perfectoExecutionContext);
        browser.reportingClient = reportingClient;


        var perfectoReporter = {
            jasmineStarted: function(suiteInfo) {
                // put insome info on jasmine started
            },
            suiteStarted: (result) => {
                // here you can add some custom code to execute when each suite is started
            },
            specStarted: (result) => {
                // each spec will be a test in Perfecto Reporting
                reportingClient.testStart(result.fullName);
            },
            specDone: (result) => {
                // ending the test
                // here we report about test end event

                if (result.status === 'failed') {
                    // on a failure we report the failure message and stack trace
                    console.log('Test status is: ' + result.status);
                    const failure = result.failedExpectations[result.failedExpectations.length - 1];

                    reportingClient.testStop({
                        status: perfectoReporting.Constants.results.failed,
                        message: `${failure.message} ${failure.stack}`
                    });

                } else {
                    // on success we report that the test has passed
                    console.log('Test status is: ' + result.status);
                    reportingClient.testStop({
                        status: perfectoReporting.Constants.results.passed
                    });
                }
            },
            suiteDone: (result) => {
                // when the suite is done we print in the console its description and status
                console.log('Suite done: ' + result.description + ' was ' + result.status);
            }
        };
        jasmine.getEnv().addReporter(perfectoReporter);
    },
    onComplete: function() {
        // Output report URL
        return reportingClient.getReportUrl().then(
            function(url) {
                console.log(`Report url - ${url}`);
            }
        );
    },
    //set jasmine options
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 1000000,
    },
}