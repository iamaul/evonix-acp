import React, { useEffect, useContext } from 'react';
import { Container, Statistic, Divider } from 'semantic-ui-react';
import NumberFormat from 'react-number-format';
import {
    ResponsiveContainer,
    Radar, 
    RadarChart, 
    PolarGrid, 
    PolarAngleAxis, 
    PolarRadiusAxis
} from 'recharts';

import StatsContext from '../context/stats/statsContext';

import Loader from '../components/layouts/loader/Loader';

const Home = () => {
    const statsContext = useContext(StatsContext);
    const { 
        getCountServerCharacters,
        getCountServerGroupByAssistances,
        getCountServerAssistances,
        getCountServerGroupByReports,
        getCountServerReports,
        total_characters,
        total_assistances,
        total_reports,
        group_by_assistances,
        group_by_reports,
        setLoading
    } = statsContext;

    useEffect(() => {
        getCountServerCharacters();
        getCountServerGroupByAssistances();
        getCountServerAssistances();
        getCountServerGroupByReports();
        getCountServerReports();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Container>
                <Statistic.Group size="small" widths="3">
                    <Statistic>
                        { setLoading ? (<Loader isLoading={setLoading} />) : (
                            <Statistic.Value>
                                <NumberFormat value={total_characters} displayType={'text'} thousandSeparator={true} />
                            </Statistic.Value> )
                        }
                        <Statistic.Label>Characters</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        { setLoading ? (<Loader isLoading={setLoading} />) : (
                            <Statistic.Value>
                                <NumberFormat value={total_assistances} displayType={'text'} thousandSeparator={true} />
                            </Statistic.Value> )
                        }
                        <Statistic.Label>Total Request Assistances</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        { setLoading ? (<Loader isLoading={setLoading} />) : (
                            <Statistic.Value>
                                <NumberFormat value={total_reports} displayType={'text'} thousandSeparator={true} />
                            </Statistic.Value> )
                        }
                        <Statistic.Label>Total Reports</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
                <Divider hidden />
                <Divider hidden />
                <ResponsiveContainer>
                    <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={group_by_assistances}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey={group_by_assistances.handler} />
                        <PolarRadiusAxis/>
                        <Radar name="Mike" dataKey={group_by_assistances.count_handler} stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                    </RadarChart>
                    <Divider />
                    <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={group_by_reports}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey={group_by_reports.handler} />
                        <PolarRadiusAxis/>
                        <Radar name="Mike" dataKey={group_by_reports.count_handler} stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6}/>
                    </RadarChart>
                </ResponsiveContainer>
            </Container>
        </>
    )
}

export default Home
