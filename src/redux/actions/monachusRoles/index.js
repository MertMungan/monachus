export const createMonachusRole =
  (monachusRoleInfo = [], monachusRoleData = []) =>
  async (dispatch, getState) => {
    let currentRoleDataList = JSON.parse(
      localStorage.getItem("monachusRoleData")
    );

    if (currentRoleDataList === null) {
      currentRoleDataList = [
        {
          roleName: monachusRoleInfo.roleName,
          roleDescription: monachusRoleInfo.roleDescription,
          dashboardsCRUD: monachusRoleData.dashboardsCRUD,
          cepCRUD: monachusRoleData.cepCRUD,
          dataFlowCRUD: monachusRoleData.dataFlowCRUD,
          settingsCRUD: monachusRoleData.settingsCRUD,
        },
      ];
      localStorage.setItem(
        "monachusRoleData",
        JSON.stringify(currentRoleDataList)
      );
    }

    if (currentRoleDataList?.length > 0) {
      const foundRole = currentRoleDataList.find(
        (item) => item.roleName === monachusRoleInfo.roleName
      );
      if (foundRole) {
      } else {
        currentRoleDataList.push({
          roleName: monachusRoleInfo.roleName,
          roleDescription: monachusRoleInfo.roleDescription,
          dashboardsCRUD: monachusRoleData.dashboardsCRUD,
          cepCRUD: monachusRoleData.cepCRUD,
          dataFlowCRUD: monachusRoleData.dataFlowCRUD,
          settingsCRUD: monachusRoleData.settingsCRUD,
        });
      }
    } else {
      currentRoleDataList.push({
        roleName: monachusRoleInfo.roleName,
        roleDescription: monachusRoleInfo.roleDescription,
        dashboardsCRUD: monachusRoleData.dashboardsCRUD,
        cepCRUD: monachusRoleData.cepCRUD,
        dataFlowCRUD: monachusRoleData.dataFlowCRUD,
        settingsCRUD: monachusRoleData.settingsCRUD,
      });
    }

    localStorage.setItem(
      "monachusRoleData",
      JSON.stringify(currentRoleDataList)
    );
    dispatch({ type: "CREATE_MONACHUS_ROLE", payload: monachusRoleData });
  };

export const updateMonachusRole =
  (monachusRoleInfo = [], monachusRoleData = []) =>
  async (dispatch, getState) => {
    let currentRoleDataList = JSON.parse(
      localStorage.getItem("monachusRoleData")
    );

    const filteredData = currentRoleDataList.findIndex(
      (item) => item.roleName === monachusRoleInfo.roleName
    );

    // if filteredData is -1, then the role does not exist, so we need to add it
    if (filteredData === -1) {
      currentRoleDataList.push({
        roleName: monachusRoleInfo.roleName,
        roleDescription: monachusRoleInfo.roleDescription,
        dashboardsCRUD: monachusRoleData.dashboardsCRUD,
        cepCRUD: monachusRoleData.cepCRUD,
        dataFlowCRUD: monachusRoleData.dataFlowCRUD,
        settingsCRUD: monachusRoleData.settingsCRUD,
      });
    }
    // if filteredData is not -1, then the role does exist, so we need to update it
    else {
      currentRoleDataList[filteredData] = {
        roleName: monachusRoleInfo.roleName,
        roleDescription: monachusRoleInfo.roleDescription,
        dashboardsCRUD: monachusRoleData.dashboardsCRUD,
        cepCRUD: monachusRoleData.cepCRUD,
        dataFlowCRUD: monachusRoleData.dataFlowCRUD,
        settingsCRUD: monachusRoleData.settingsCRUD,
      };
    }

    // currentRoleDataList[filteredData] = [...currentRoleDataList[filteredData],
    // {
    //   roleName: monachusRoleInfo.roleName,
    //   roleDescription: monachusRoleInfo.roleDescription,
    //   dashboardsCRUD: monachusRoleData.dashboardsCRUD,
    //   cepCRUD: monachusRoleData.cepCRUD,
    //   dataFlowCRUD: monachusRoleData.dataFlowCRUD,
    //   settingsCRUD: monachusRoleData.settingsCRUD,
    // }]

    localStorage.setItem(
      "monachusRoleData",
      JSON.stringify(currentRoleDataList)
    );
  };
