import { defineDeck } from 'beatdeck';
import '../themes/neutral.css';
import { config } from './deck.config';
import { SCENES } from './scenes';
import { Open } from './scenes/01-Open';
import { DocMap } from './scenes/02-Map';
import { What } from './scenes/03-What';
import { Concepts } from './scenes/04-Concepts';
import { Ingest } from './scenes/05-Ingest';
import { OneAgent } from './scenes/06-OneAgent';
import { OpenInference } from './scenes/07-OpenInference';
import { OTel } from './scenes/08-OTel';
import { AgentFramework } from './scenes/09-AgentFramework';
import { App } from './scenes/10-App';
import { Evals } from './scenes/11-Evals';
import { Integrations } from './scenes/12-Integrations';
import { Metrics } from './scenes/13-Metrics';
import { UseCases1 } from './scenes/14-UseCases1';
import { UseCases2 } from './scenes/15-UseCases2';
import { FAQ } from './scenes/16-FAQ';
import { End } from './scenes/17-End';

/** Every layer of the stage, back to front. All stay mounted; each shows itself for its own scene. */
function Stage() {
  return (
    <>
      <Open />
      <DocMap />
      <What />
      <Concepts />
      <Ingest />
      <OneAgent />
      <OpenInference />
      <OTel />
      <AgentFramework />
      <App />
      <Evals />
      <Integrations />
      <Metrics />
      <UseCases1 />
      <UseCases2 />
      <FAQ />
      <End />
    </>
  );
}

export default defineDeck({
  id: 'ai-observability',
  title: config.title,
  lang: 'es',
  scenes: SCENES,
  Stage,
  fonts: ['400 100px "Inter Variable"', '600 100px "Inter Variable"', '400 32px "JetBrains Mono Variable"'],
  qrUrl: config.qrUrl,
});
