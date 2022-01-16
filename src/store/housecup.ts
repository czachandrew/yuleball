import { defineStore } from "pinia";
import { useStore } from "./index";

export enum House {
  Gryfindor = "gryfindor",
  Hufflepuff = "hufflepuff",
  Slytherin = "slytherin",
  Ravenclaw = "ravenclaw",
  Hogwarts = "hogwarts",
  Durmstrang = "durmstrang",
  Beauxbatons = "beauxbatons"
}

interface Score {
  id: number;
  points: number;
  ratio: number;
  friendly_name: string;
}

interface State {
  gryfindor: Score;
  hufflepuff: Score;
  slytherin: Score;
  ravenclaw: Score;
  hogwarts: Score;
  durmstrang: Score;
  beauxbatons: Score;
  mode: string;
}

export interface PointsObject {
  house: House;
  points: number;
  from?: string;
}

function makeid(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const useHousecup = defineStore("housecup", {
  state: (): State => ({
    gryfindor: {
      id: 1,
      points: 0,
      ratio: 0,
      friendly_name: "Gryfindor"
    },
    hufflepuff: {
      id: 2,
      points: 0,
      ratio: 0,
      friendly_name: "Hufflepuff"
    },
    slytherin: {
      id: 3,
      points: 1,
      ratio: 0,
      friendly_name: "Slytherin"
    },
    ravenclaw: {
      id: 4,
      points: 0,
      ratio: 0,
      friendly_name: "Ravenclaw"
    },
    hogwarts: {
      id: 5,
      points: 0,
      ratio: 0,
      friendly_name: "Hogwarts"
    },
    durmstrang: {
      id: 6,
      points: 0,
      ratio: 0,
      friendly_name: "Durmstrang"
    },
    beauxbatons: {
      id: 7,
      points: 0,
      ratio: 0,
      friendly_name: "Beauxbatons"
    },
    mode: "triwizard"
  }),
  getters: {
    totalPoints: (state: State) => {
      let total = 0;
      if (state.mode === "house") {
        total =
          state.gryfindor.points +
          state.hufflepuff.points +
          state.slytherin.points +
          state.ravenclaw.points;
      } else {
        total =
          state.durmstrang.points +
          state.hogwarts.points +
          state.beauxbatons.points;
      }

      return total;
    },
    housePoints: (state: State) => (house: House) => {
      console.log(house);
      return state[house].points;
    },
    housePointsRatio: (state: State) => (house: House) => {
      return state[house].ratio;
    },
    houseId: (state: State) => (house: House) => {
      return state[house].id;
    },
    leader: (state: State) => {
      let array = [
        state.gryfindor,
        state.hufflepuff,
        state.slytherin,
        state.ravenclaw
      ];
      if (state.mode == "triwizard") {
        array = [];
        array = [state.hogwarts, state.durmstrang, state.beauxbatons];
      }
      array.sort((a, b) => (a.points < b.points ? 1 : -1));
      return array[0];
    }
  },
  actions: {
    setPoints(house: House, points: number) {
      this[house].points = points;
    },
    addPointsToGryffindor(points: number) {
      this[House.Gryfindor].points += points;
    },
    addPointsToSlytherin(points: number) {
      this[House.Slytherin].points += points;
    },
    addPointsToHufflepuff(points: number) {
      this[House.Hufflepuff].points += points;
    },
    addPointsToRavenclaw(points: number) {
      this[House.Ravenclaw].points += points;
    },
    addPointsToHogwarts(points: number) {
      this[House.Hogwarts].points += points;
    },
    addPointsToDurmstrang(points: number) {
      this[House.Durmstrang].points += points;
    },
    addPointsToBeauxbatons(points: number) {
      this[House.Beauxbatons].points += points;
    },
    managePointIncrease(pointsObject: PointsObject): void {
      let success = false;
      switch (pointsObject.house as House) {
        case House.Gryfindor:
          success = true;
          this.addPointsToGryffindor(pointsObject.points);
          break;
        case House.Hufflepuff:
          success = true;
          this.addPointsToHufflepuff(pointsObject.points);
          break;
        case House.Slytherin:
          success = true;
          this.addPointsToSlytherin(pointsObject.points);
          break;
        case House.Ravenclaw:
          success = true;
          this.addPointsToRavenclaw(pointsObject.points);
          break;
        case House.Hogwarts:
          success = true;
          this.addPointsToHogwarts(pointsObject.points);
          break;
        case House.Durmstrang:
          success = true;
          this.addPointsToDurmstrang(pointsObject.points);
          break;
        case House.Beauxbatons:
          success = true;
          this.addPointsToBeauxbatons(pointsObject.points);
          break;
        default:
          break;
      }
      if (success) {
        const store = useStore();
        store.addToast({
          id: makeid(5),
          title: `House Points for ${capitalizeFirstLetter(
            pointsObject.house
          )}`,
          message: `${
            pointsObject.points
          } points have been awarded to ${capitalizeFirstLetter(
            pointsObject.house
          )}!`,
          timestamp: "Just Now"
        });
      }

      // adjust all ratios
    }
  }
});
