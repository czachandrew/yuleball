import { defineStore } from "pinia";
import { useStore } from "./index";

export enum House {
  Gryfindor = "gryfindor",
  Hufflepuff = "hufflepuff",
  Slytherin = "slytherin",
  Ravenclaw = "ravenclaw",
}

interface Score {
  points: number;
  ratio: number;
  friendly_name: string;
}

interface State {
  gryfindor: Score;
  hufflepuff: Score;
  slytherin: Score;
  ravenclaw: Score;
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
      points: 0,
      ratio: 0,
      friendly_name: "Gryfindor",
    },
    hufflepuff: {
      points: 0,
      ratio: 0,
      friendly_name: "Hufflepuff",
    },
    slytherin: {
      points: 1,
      ratio: 0,
      friendly_name: "Slytherin",
    },
    ravenclaw: {
      points: 0,
      ratio: 0,
      friendly_name: "Ravenclaw",
    },
  }),
  getters: {
    totalPoints: (state: State) => {
      const total =
        state.gryfindor.points +
        state.hufflepuff.points +
        state.slytherin.points +
        state.ravenclaw.points;
      return total;
    },
    housePoints: (state: State) => (house: House) => {
      console.log(house);
      return state[house].points;
    },
    housePointsRatio: (state: State) => (house: House) => {
      return state[house].ratio;
    },
    leader: (state: State) => {
      const array = [
        state.gryfindor,
        state.hufflepuff,
        state.slytherin,
        state.ravenclaw,
      ];
      array.sort((a, b) => (a.points < b.points ? 1 : -1));
      return array[0];
    },
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
          timestamp: "Just Now",
        });
      }

      // adjust all ratios
    },
  },
});
