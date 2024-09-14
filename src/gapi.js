import axios from "axios";
import supabase from "./Supabase";


async function api(method, param, path) {
    const access_token = (await supabase.auth.getSession()).data.session
        .access_token;
    const allData = await supabase.auth.getSession();

    var res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/gapi/searchConsole`,
        {
            method: method,
            param: param,
            path: path,
            p_token: allData.data.session.provider_token,
        },
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    );

    return res.data;
};

async function getCountry(n) {
    const path = `/sites/${localStorage.getItem(
        "website"
    )}/searchAnalytics/query`;
    const param = {
        startDate: "2020-01-01",
        endDate: "2023-01-31",
        dimensions: ["country"],
    };

    const res = await api("post", param, path);
    var temp = [];
    for (let i = 0; i < res.rows.length; i++) {
        temp.push({
            country: res.rows[i].keys[0],
            clicks: res.rows[i].clicks,
            impressions: res.rows[i].impressions,
            ctr: res.rows[i].ctr,
        });
    }

    temp.sort((a, b) => b.clicks - a.clicks);

    return (temp.splice(0, n));
};
const getQueries = async (n) => {
    const path = `/sites/${localStorage.getItem(
        "website"
    )}/searchAnalytics/query`;
    const param = {
        startDate: "1991-01-01",
        endDate: "2023-01-31",
        dimensions: ["query"],
    };

    const res = await api("post", param, path);
    var temp = [];
    for (let i = 0; i < res.rows.length; i++) {
        temp.push({
            keyword: res.rows[i].keys[0],
            clicks: res.rows[i].clicks,
            impressions: res.rows[i].impressions,
            ctr: res.rows[i].ctr,
            position: res.rows[i].position,
        });
    }


    temp.sort((a, b) => b.clicks - a.clicks);

    return (temp.splice(0, n));
};

async function getDevices(n) {
    const path = `/sites/${localStorage.getItem(
        "website"
    )}/searchAnalytics/query`;
    const param = {
        startDate: "1991-01-01",
        endDate: "2023-01-31",
        dimensions: ["device"],
    };

    const res = await api("post", param, path);
    var temp = [];
    for (let i = 0; i < res.rows.length; i++) {
        temp.push({
            device: res.rows[i].keys[0],
            clicks: res.rows[i].clicks,
            impressions: res.rows[i].impressions,
            ctr: res.rows[i].ctr,
            position: res.rows[i].position,
        });
    }
    temp.sort((a, b) => b.clicks - a.clicks);

    return (temp.splice(0, n));
};

async function getSearch(n) {
    const path = `/sites/${localStorage.getItem(
        "website"
    )}/searchAnalytics/query`;
    const param = {
        startDate: "1991-01-01",
        endDate: "2023-01-31",
        dimensions: ["searchAppearance"],
    };

    const res = await api("post", param, path);
    var temp = [];
    for (let i = 0; i < res.rows.length; i++) {
        temp.push({
            device: res.rows[i].keys[0],
            clicks: res.rows[i].clicks,
            impressions: res.rows[i].impressions,
            ctr: res.rows[i].ctr,
            position: res.rows[i].position,
        });
    }
    temp.sort((a, b) => b.clicks - a.clicks);

    return (temp.splice(0, n));
};

export { getCountry, getQueries, getDevices, getSearch }