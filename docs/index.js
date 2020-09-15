
import SwaggerUI from 'swagger-ui';
import SwaggerParser from "@apidevtools/swagger-parser";

import 'swagger-ui/dist/swagger-ui.css';

import spec from '../specs/openapi.json';

const ui = SwaggerUI({
    spec,
    dom_id: '#swagger',
});

ui.initOAuth({
    appName: "Wikibase REST API Proposal",
    // See https://demo.identityserver.io/ for configuration details.
    clientId: 'implicit'
});
