import { HttpClient } from "aurelia-fetch-client";

export class App {
  public agencies: IAgency[];

  public loadData() {
    const client = new HttpClient();

    client
      .fetch("data.json")
      .then(response => response.json())
      .then((data: IAgency[]) => {
        data.forEach(agency => (agency.steps = mapLoadedSteps(agency.steps)));

        this.agencies = data;
      });
  }
}

function mapLoadedSteps(steps: IStep[]) {
  return steps.map(step => {
    step.processing = false;
    step.status = "";

    return step;
  });
}

interface IStep {
  name: string;
  description: string;
  processing: boolean; //Not from server but want to add this on client
  status: string; //Not from server but want to add this on client
}

interface IAgency {
  name: string;
  type: string;
  steps: IStep[];
}
