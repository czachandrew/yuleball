export enum House {
  Gryffindor = "gryffindor",
  Hufflepuff = "hufflepuff",
  Slytherin = "slytherin",
  Ravenclaw = "ravenclaw",
}

export interface PointsObject {
  house: House;
  points: number;
  from?: string;
}
export const housecup = {
  state: () => ({
    gryffindor: {
      points: 0,
      ratio: 0,
    },
    hufflepuff: {
      points: 0,
      ratio: 0,
    },
    slytherin: {
      points: 1,
      ratio: 0,
    },
    ravenclaw: {
      points: 0,
      ratio: 0,
    },
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
    },
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
    },
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
    },
  },
};
