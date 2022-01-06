import { defineStore } from "pinia";

export enum House {
  Gryffindor = "gryffindor",
  Hufflepuff = "hufflepuff",
  Slytherin = "slytherin",
  Ravenclaw = "ravenclaw"
}

interface Score {
  points: number;
  ratio: number;
}

interface State {
  gryffindor: Score;
  hufflepuff: Score;
  slytherin: Score;
  ravenclaw: Score;
}

export interface PointsObject {
  house: House;
  points: number;
  from?: string;
}

export const useHousecup = defineStore("housecup", {
  state: (): State => ({
    gryffindor: {
      points: 0,
      ratio: 0
    },
    hufflepuff: {
      points: 0,
      ratio: 0
    },
    slytherin: {
      points: 1,
      ratio: 0
    },
    ravenclaw: {
      points: 0,
      ratio: 0
    }
  }),
  getters: {
    totalPoints: (state: State) => {
      const total =
        state.gryffindor.points +
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
    }
  },
  actions: {
    addPointsToGryffindor(points: number) {
      this[House.Gryffindor].points += points;
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
      switch (pointsObject.house as House) {
        case House.Gryffindor:
          this.addPointsToGryffindor(pointsObject.points);
          break;
        case House.Hufflepuff:
          this.addPointsToHufflepuff(pointsObject.points);
          break;
        case House.Slytherin:
          this.addPointsToSlytherin(pointsObject.points);
          break;
        case House.Ravenclaw:
          this.addPointsToRavenclaw(pointsObject.points);
          break;
        default:
          break;
      }
      // adjust all ratios
    }
  }
});

export const housecup = {
  state: () => ({
    gryffindor: {
      points: 0,
      ratio: 0
    },
    hufflepuff: {
      points: 0,
      ratio: 0
    },
    slytherin: {
      points: 1,
      ratio: 0
    },
    ravenclaw: {
      points: 0,
      ratio: 0
    }
  }),
  getters: {
    totalPoints: (state: any) => {
      const total =
        state.gryffindor.points +
        state.hufflepuff.points +
        state.slytherin.points +
        state.ravenclaw.points;
      return total;
    },
    housePoints: (state: any) => (house: string) => {
      console.log(house);
      return state[house].points;
    },
    housePointsRatio: (state: any) => (house: House) => {
      return state[house].ratio;
    }
  },
  mutations: {
    addPointsToGryffindor(state: any, points: number) {
      state[House.Gryffindor].points += points;
    },
    addPointsToSlytherin(state: any, points: number) {
      state[House.Slytherin].points += points;
    },
    addPointsToHufflepuff(state: any, points: number) {
      state[House.Hufflepuff].points += points;
    },
    addPointsToRavenclaw(state: any, points: number) {
      state[House.Ravenclaw].points += points;
    }
  },
  actions: {
    managePointIncrease(context: any, pointsObject: PointsObject): void {
      switch (pointsObject.house as House) {
        case House.Gryffindor:
          context.commit("addPointsToGryffindor", pointsObject.points);
          break;
        case House.Hufflepuff:
          context.commit("addPointsToHufflepuff", pointsObject.points);
          break;
        case House.Slytherin:
          context.commit("addPointsToSlytherin", pointsObject.points);
          break;
        case House.Ravenclaw:
          context.commit("addPointsToRavenclaw", pointsObject.points);
          break;
        default:
          break;
      }
      // adjust all ratios
    }
  }
};
